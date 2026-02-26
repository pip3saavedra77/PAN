import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from '../../dtos/role.dto';

@Injectable()
export class RolesService {

    roles: Role[] = [];
    constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) { }

    async findAll() {
        this.roles = await this.roleRepo.find({ relations: ['users'] });
        return this.roles;
    }

    async findOne(roleId: number) {
        const role = await this.roleRepo.findOne({
            where: { id: roleId },
            relations: ['users'],
        });
        if (!role) {
            throw new NotFoundException(`Role #${roleId} not found`);
        }
        return role;
    }

    createRole(payload: CreateRoleDto) {
        const newRole = this.roleRepo.create(payload);
        return this.roleRepo.save(newRole);
    }

    async updateRole(id: number, payloadUpdated: UpdateRoleDto) {
        const role = await this.roleRepo.findOne({ where: { id } });
        if (!role) {
            throw new NotFoundException(`Role #${id} not found`);
        }
        this.roleRepo.merge(role, payloadUpdated);
        return this.roleRepo.save(role);
    }

    deleteRole(idRole: number) {
        return this.roleRepo.delete(idRole);
    }
}
