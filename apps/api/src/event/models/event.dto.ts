import { Type } from 'class-transformer';
import {IsArray, IsDate, IsDateString, IsISO8601, IsNumber, IsObject, IsOptional, IsString, ValidateNested} from 'class-validator';



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

export class CreateEventDto {
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
