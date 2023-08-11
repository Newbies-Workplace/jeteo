import { Type, Transform } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from "class-validator";
import { trimIfExists } from "../../../util";

class Coordinates {
  @IsNumber()
  @IsLatitude()
  latitude: number;

  @IsNumber()
  @IsLongitude()
  longitude: number;
}

export class EventAddress {
  @IsString()
  @Transform(({ value }) => trimIfExists(value))
  @Length(2)
  city: string;

  @IsString()
  @Transform(({ value }) => trimIfExists(value))
  @Length(2)
  place: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => Coordinates)
  coordinates?: Coordinates;
}

export class CreateEventRequest {
  @IsString()
  @Transform(({ value }) => trimIfExists(value))
  @Length(5)
  title: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => trimIfExists(value))
  @Length(5)
  subtitle?: string | null;

  @IsString()
  @Transform(({ value }) => trimIfExists(value))
  @Length(5)
  description: string;

  @IsDateString()
  from: string;

  @IsDateString()
  to: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => EventAddress)
  address?: EventAddress;

  @IsArray()
  @IsString({ each: true })
  @Length(1, 20, { each: true })
  tags: string[];
}
