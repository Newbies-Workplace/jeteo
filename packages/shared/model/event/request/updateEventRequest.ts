import { IsEnum, IsHexColor, IsOptional, IsString, Length } from "class-validator";
import { CreateEventRequest } from "./createEvent.request";

export class UpdateEventRequest extends CreateEventRequest {
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
  tags: string[];

  // other optional fields

  @IsOptional()
  @IsHexColor()
  @Length(7, 7)
  primaryColor?: string;

  @IsOptional()
  @IsString()
  @IsEnum(['PRIVATE', 'HIDDEN', 'PUBLIC'])
  visibility?: 'PRIVATE' | 'HIDDEN' | 'PUBLIC';
}
