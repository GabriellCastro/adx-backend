import { Users } from '@prisma/client';

export class AuthResponse {
  token: string;
  user: Users;
}
