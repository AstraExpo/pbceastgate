export interface User {
  id: string;
  name: string;
  role: 'ADMIN' | 'CLIENT' | 'GUEST';
}