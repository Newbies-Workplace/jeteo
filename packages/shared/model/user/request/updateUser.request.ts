import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

class UserSocials {
  @IsOptional()
  @IsString()
  @IsEmail()
  mail: string | null;

  @IsOptional()
  @IsString()
  github: string | null;

  @IsOptional()
  @IsString()
  twitter: string | null;

  @IsOptional()
  @IsString()
  linkedIn: string | null;
}

export class UpdateUserRequest {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  avatar: string | null;

  @IsOptional()
  @IsString()
  jobTitle: string | null;

  @IsOptional()
  @IsString()
  description: string | null;

  @IsObject()
  @ValidateNested()
  @Type(() => UserSocials)
  socials: UserSocials;
}
