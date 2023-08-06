import { Database } from "../../../main/database/database.connection";
import { JobRepository } from "../../features/job/repositories/job.repository";
import { UserRepository } from "../../features/user/repositories/user.repository";
import { JobApplication } from "../../models/job-application.model";
import { JobApplicationEntity } from "../../shared/database/entities/job-application.entity";


export class JobApplicationRepository {
  private repository = Database.connection.getRepository(JobApplicationEntity);

  public async create(jobApplication: JobApplication) {
    const entity = this.repository.create({
      idJob: jobApplication.job.id,
      idCandidate: jobApplication.candidate.id,
      date: jobApplication.date,
      success: jobApplication.success,
    });

    await this.repository.save(entity);
  }

  public async listByCandidateId(idCandidate: string) {
    const result = await this.repository.find({
      where: { idCandidate },
      relations: { job: true, candidate: true },
    });

    return result.map((row) => JobApplicationRepository.mapRowToModel(row));
  }

  public async listByJobId(idJob: string) {
    const result = await this.repository.find({
      where: {
        idJob,
      },

      relations: {
        job: {
          recruiter: true,
        },
        candidate: true,
      },
    });

    return result.map((row) => JobApplicationRepository.mapRowToModel(row)!);
  }

  public static mapRowToModel(row?: JobApplicationEntity | null) {
    if (!row) {
      return undefined;
    }

    const candidate = UserRepository.mapRowToModel(row.candidate);
    const job = JobRepository.mapRowToModel(row.job);

    return JobApplication.create(row, candidate!, job!);
  }
}