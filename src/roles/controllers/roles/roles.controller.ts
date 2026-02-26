import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from '../../dtos/role.dto';
import { RolesService } from '../../services/roles/roles.service';

@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) { }

    @Get()
    getRoles() {
        return this.rolesService.findAll();
    }

    @Get(':roleId')
    getOne(@Param('roleId', ParseIntPipe) roleId: number) {
        return this.rolesService.findOne(roleId);
    }

    @Post()
    createRole(@Body() payload: CreateRoleDto) {
        return this.rolesService.createRole(payload);
    }

    @Put(':roleId')
    updateRole(@Param('roleId', ParseIntPipe) roleId: number, @Body() payloadUpdated: UpdateRoleDto) {
        return this.rolesService.updateRole(roleId, payloadUpdated);
    }

    @Delete(':roleId')
    deleteRole(@Param('roleId', ParseIntPipe) roleId: number) {
        this.rolesService.deleteRole(roleId);
    }

}
