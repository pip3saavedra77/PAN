import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name;

    @Column({ type: 'varchar', length: 255 })
    lastName;

    @Column({ type: 'varchar', length: 255 })
    docType;

    @Column({ type: 'varchar', length: 255 })
    docNumber;

    @Column({ type: 'varchar', length: 55 })
    miTest;

    @Column({ type: 'varchar', length: 255 })
    miTest2;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({ name: 'users_roles' })
    roles: Role[];
}
