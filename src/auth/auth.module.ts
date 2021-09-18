import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User } from "./entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { AuthStrategy } from "./strategy/auth.strategy";
import { ConfigModule } from "@nestjs/config";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthStrategy],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: "iJj6XVxAjH7LPhpJrhdbRw6H9wjNRBKo",
    }),
  ],
})
export class AuthModule {}
