import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { User } from "./auth/entities/user.entity";
import { QuestionModule } from "./question/question.module";
import { Question } from "./question/entities/question.entity";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "hattie.db.elephantsql.com",
      port: 5432,
      username: "bekzyjnm",
      password: "yZkS2I4xFit-OtPkOkw781U2-OvFEEWA",
      database: "bekzyjnm",
      entities: [User, Question],
      synchronize: false,
    }),
    AuthModule,
    QuestionModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
