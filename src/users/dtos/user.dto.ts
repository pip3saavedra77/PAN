/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsArray, IsNumber, IsOptional } from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly lastName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly docType: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly docNumber: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly miTest: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly miTest2: string;

    // FIXED: Campo para asignar roles al crear usuario (opcional para retrocompatibilidad)
    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    @ApiProperty({ type: [Number], required: false, description: 'IDs de roles a asignar' })
    readonly roleIds?: number[];
}
export class UpdateUserDto extends PartialType(CreateUserDto) { }