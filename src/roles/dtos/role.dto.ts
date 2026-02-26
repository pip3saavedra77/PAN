/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly description: string;
}
export class UpdateRoleDto extends PartialType(CreateRoleDto) { }
