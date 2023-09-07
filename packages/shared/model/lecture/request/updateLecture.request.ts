import { IsOptional, IsString } from "class-validator";
import {
  CreateLectureInvite,
  CreateLectureRequest,
} from "./createLecture.request";

export class UpdateLectureRequest extends CreateLectureRequest {
  // override optional fields from CreateEventRequest
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  from: string;

  @IsOptional()
  to: string;

  @IsOptional()
  invites: CreateLectureInvite[];

  // other optional fields

  @IsOptional()
  @IsString({ each: true })
  speakerIds: string[];
}
