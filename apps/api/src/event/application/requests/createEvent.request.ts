import { Type } from 'class-transformer';
import {IsArray, IsDateString, IsNumber, IsObject, IsOptional, IsString, ValidateNested} from 'class-validator';


class Coordinates {
    @IsNumber()
    latitude: number;
    
    @IsNumber()
    longitude: number;
}

class Address {
    @IsString()
    city: string;

    @IsString()
    place: string;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => Coordinates)
    coordinates?: Coordinates;
}

export class CreateEventRequest {
    @IsString()
    title: string;

    @IsString()
    subtitle: string;

    @IsString()
    description: string;

    @IsDateString()
    from: string;

    @IsDateString()
    to: string;
    
    @IsObject()
    @ValidateNested()
    @Type(() => Address)
    address: Address;

    @IsArray()
    @IsString({each: true})
    tags: string[];
}
