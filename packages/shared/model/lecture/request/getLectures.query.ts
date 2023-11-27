import { IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class GetLecturesQuery {
  @IsString()
  eventId: string;

  @Type(() => Number)
  @IsNumber()
  page: number;
  @Type(() => Number)
  @IsNumber()
  size: number;
}

export class GetMyLecturesQuery {
  @Type(() => Number)
  @IsNumber()
  page: number;
  @Type(() => Number)
  @IsNumber()
  size: number;
}
