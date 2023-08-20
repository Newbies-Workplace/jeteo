import {
  ArrayMaxSize,
  IsArray,
  IsDateString,
  IsEmail,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateLectureRequest {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsDateString()
  from: string;
  @IsDateString()
  to: string;
  @IsArray()
  @ArrayMaxSize(2)
  @ValidateNested({ each: true })
  @Type(() => CreateLectureInvite)
  invites: CreateLectureInvite[];
}

export class CreateLectureInvite {
  @IsUUID()
  id: string;
  @IsString()
  name: string;
  @IsEmail()
  email: string;
}
