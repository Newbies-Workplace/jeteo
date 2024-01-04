import {
  ArrayMaxSize,
  IsArray,
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  Length,
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
  @Length(11, 11)
  @IsString()
  @IsOptional()
  youtubeVideoId?: string;
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
  mail: string;
}
