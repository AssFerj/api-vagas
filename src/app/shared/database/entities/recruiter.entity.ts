import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { EUserType, UserType } from "../../../models/user-type.model";

@Entity('recruiters')
export class RecruiterEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        length: 1,
        enum: EUserType
    })
    type: UserType;

    @Column({
        name: 'enterprise_name'
    })
    enterpriseName: string;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: string;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: string;
}