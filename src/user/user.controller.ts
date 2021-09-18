import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":username")
  getUserProfile(@Param("username") username: string) {
    return this.userService.getUserProfile(username);
  }

  @Get("/find/:username")
  findUsers(@Param("username") username: string) {
    return this.userService.findUsers(username);
  }
}
