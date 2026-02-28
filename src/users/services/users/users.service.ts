import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto';
// FIXED: Importar Role para poder asignar roles al crear/actualizar usuario
import { Role } from '../../../roles/entities/role.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        // FIXED: Inyectar Repository<Role> para buscar roles por ID
        @InjectRepository(Role) private roleRepo: Repository<Role>,
    ) { }

    async findAll() {
        return this.userRepo.find();
    }

    async findOne(userId: number) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ['roles'],
        });
        if (!user) {
            throw new NotFoundException(`User #${userId} not found`);
        }
        return user;
    }

    // FIXED: Ahora acepta roleIds opcionales y asigna roles al usuario
    async createUser(payload: CreateUserDto) {
        const newUser = this.userRepo.create(payload);
        if (payload.roleIds && payload.roleIds.length > 0) {
            const roles = await this.roleRepo.findBy({ id: In(payload.roleIds) });
            if (roles.length !== payload.roleIds.length) {
                throw new NotFoundException('Uno o más roles no fueron encontrados');
            }
            newUser.roles = roles;
        }
        return this.userRepo.save(newUser);
    }

    // FIXED: Ahora acepta roleIds opcionales para actualizar roles del usuario
    async updateUser(id: number, payloadUpdated: UpdateUserDto) {
        const user = await this.userRepo.findOne({ where: { id }, relations: ['roles'] });
        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        this.userRepo.merge(user, payloadUpdated);
        if (payloadUpdated.roleIds !== undefined) {
            if (payloadUpdated.roleIds.length > 0) {
                const roles = await this.roleRepo.findBy({ id: In(payloadUpdated.roleIds) });
                if (roles.length !== payloadUpdated.roleIds.length) {
                    throw new NotFoundException('Uno o más roles no fueron encontrados');
                }
                user.roles = roles;
            } else {
                user.roles = [];
            }
        }
        return this.userRepo.save(user);
    }

    deleteUser(idUser: number) {
        return this.userRepo.delete(idUser);
    }
}
