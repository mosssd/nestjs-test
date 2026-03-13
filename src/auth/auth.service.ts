import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    console.log("user", user);
    if (user && await bcrypt.compare(password, user.password)) {
      const result = user.toObject();
      return {
        userId: result._id,
        email: result.email,
      };
    }
    return null;
  }
}
