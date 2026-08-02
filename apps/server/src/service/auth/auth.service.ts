import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service.js';
import { CustomJwtService } from './strategy/jwt.service.js';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: CustomJwtService
  ) {}

  // 1. Native Login
  async loginWithEmail(email: string, passwordPlain: string) {
    const user = await this.userService.findByEmail(email);
    
    // Check if user exists AND has a password (they might have signed up with Google)
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(passwordPlain, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.signToken({ sub: user.id, role: user.systemRole });
    return { accessToken, user };
  }

  // 2. Native Registration
  async registerWithEmail(email: string, passwordPlain: string, firstName: string) {
    const user = await this.userService.createWithEmailAndPassword(email, passwordPlain, firstName);
    const accessToken = this.jwtService.signToken({ sub: user.id, role: user.systemRole });
    return { accessToken, user };
  }

  // 3. OAuth Login (Google, Apple, Microsoft)
  async loginWithFirebaseToken(firebaseToken: string) {
    try {
      const decodedToken = await getAuth().verifyIdToken(firebaseToken);
      const { email, name, picture } = decodedToken;

      if (!email) throw new UnauthorizedException('No email provided by provider');

      // Apple/Microsoft might not provide a name on subsequent logins, use fallback
      const firstName = name?.split(' ')[0] || 'User'; 

      const user = await this.userService.upsertProviderUser(email, firstName, picture);
      const accessToken = this.jwtService.signToken({ sub: user.id, role: user.systemRole });
      
      return { accessToken, user };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired provider token');
    }
  }
}