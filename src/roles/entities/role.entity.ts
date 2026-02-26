import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
}
