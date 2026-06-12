export interface ServerEnv {
  APP_ENV: 'development' | 'staging' | 'production';
  THROTTLE_TTL: number;
  THROTTLE_LIMIT: number;
  THROTTLE_MEDIUM_TTL: number;
  THROTTLE_MEDIUM_LIMIT: number;
  THROTTLE_LONG_TTL: number;
  THROTTLE_LONG_LIMIT: number;
}