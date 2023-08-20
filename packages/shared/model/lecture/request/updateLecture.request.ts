import { IsOptional } from "class-validator";
import {
  CreateLectureInvite,
  CreateLectureRequest,
} from "./createLecture.request";
import { UserResponse } from "../../user/response/user.response";

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

  @IsOptional()
  speakers: UserResponse[];
}
