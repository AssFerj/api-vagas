import { Job } from "../../../models/job.model";
import { Result, Usecase, UsecaseResponse } from "../../../shared/util";
import { UserRepository } from "../../user/repositories/user.repository";
import { JobRepository } from "../repositories/job.repository";

interface CreateJobParams {
  description: string;
  enterprise: string;
  limitDate: Date;
  isActive: boolean;
  recruiterId: string;
  maxCandidates?: number;
}

export class CreateJobUsecase implements Usecase {
  public async execute(params: CreateJobParams): Promise<Result> {

    const repository = new UserRepository();
    const recruiter = await repository.getById(params.recruiterId);

    if (!recruiter) {
      return UsecaseResponse.notFound("Recruiter");
    }

    const job = new Job(
      params.description,
      params.enterprise,
      params.limitDate,
      params.isActive,
      recruiter,
      params.maxCandidates
    );

    const jobRepository = new JobRepository();
    await jobRepository.create(job);

    return {
      ok: true,
      message: "Job successfully created",
      code: 201,
    };
  }
}