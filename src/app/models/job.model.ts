import { v4 } from "uuid";
import { Recruiter } from "./recruiter.model";
import { JobEntity } from "../shared/database/entities/job.entity";

export class Job {
    private _id: string;
    constructor(
        private _description: string,
        private _enterprise: string,
        private _limitDate: Date,
        private _isActive: boolean,
        private _recruite: Recruiter,
        private _maxCandidates?: number
    ) {
        this._id = v4();
    }

    public get id(): string {
        return this._id;
      }
      public get description(): string {
        return this._description;
      }
      public get enterprise(): string {
        return this._enterprise;
      }
      public get limitDate(): Date {
        return this._limitDate;
      }
      public get isActive(): boolean {
        return this._isActive;
      }
      public get recruiter(): Recruiter {
        return this._recruite;
      }
      public get maxCandidates(): number | undefined {
        return this._maxCandidates;
      }
      
      public toJson() {
        return {
          id: this._id,
          description: this._description,
          enterprise: this._enterprise,
          limitDate: this._limitDate,
          isActive: this._isActive,
          idRecruiter: this._recruite?.id,
          maxCandidate: this._maxCandidates,
        };
      }
    
      public static create(jobEntity: JobEntity, recruiter: Recruiter) {
        const job = new Job(
          jobEntity.description,
          jobEntity.enterprise,
          jobEntity.limiteDate,
          jobEntity.isActive,
          recruiter,
          jobEntity.maxCandidate
        );
    
        job._id = jobEntity.id;
    
        return job;
      }
}