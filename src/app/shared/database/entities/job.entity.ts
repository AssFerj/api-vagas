import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { JobApplicationEntity } from "./job-application.entity";

@Entity('jobs')
export class JobEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    description: string;

    @Column()
    enterpriseN: string;

    @Column({
        name: 'limit_date'
    })
    limiteDate: Date;

    @Column({
        name: 'is_active'    })
    isActive: boolean;

    @Column({
        name: 'id_recruiter'
    })
    idRecruiter: string;

    @Column({
        name: 'max_candidate',
        nullable: true
    })
    maxCandidate: number;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;

    @OneToMany(()=>JobApplicationEntity, (entity)=>entity.job)
    jobApplication: JobApplicationEntity[];
}
