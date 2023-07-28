import { Transform, Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class GetEventsQueryRequest {
    @Type(() => Number)
    @IsNumber()
    page: number;

    @Type(() => Number)
    @IsNumber()
    size: number;
}