import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { CANCELLED } from "dns";

export enum AppointmentStatus {
    ACTIVE = "active",
    CANCELLED = "cancelled"
}

@Entity()

export class Appointment{
    
    @PrimaryGeneratedColumn ()
    id: number;

    @Column ()
    date: Date;

    @Column ()
    time: string;

    @Column ({
        type: "enum",
        enum: AppointmentStatus,
        default: AppointmentStatus.ACTIVE
    })
    status: AppointmentStatus

    @ManyToOne(() => User, (user) => user.appointments)
    @JoinColumn({ name: "userId"})
    user: User
};
