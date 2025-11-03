import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
    export class Credential{
        @PrimaryGeneratedColumn()
        id: number;

        @Column({
            length:50,
            unique: true
    })
        username: string;

        @Column()
        password: string;

        @OneToOne(() => User, (user) => user.credentials)
        user: User
};

