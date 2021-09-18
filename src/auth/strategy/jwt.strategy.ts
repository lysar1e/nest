import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: "iJj6XVxAjH7LPhpJrhdbRw6H9wjNRBKo",
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let data = request.cookies["access"];
          return data;
        },
      ]),
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
