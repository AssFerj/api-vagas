import { JobApplication } from "../../../models/job-application.model";
import { Usecase, Result, UsecaseResponse } from "../../../shared/util";
import { JobRepository } from "../../job/repositories/job.repository";
import { UserRepository } from "../../user/repositories/user.repository";
import { JobApplicationRepository } from "../repositories/job-application.repository";

interface CreateJobApplicationParams {
  idCandidate: string;
  idJob: string;
}

export class CreateJobApplicationUsecase implements Usecase {
  public async execute(params: CreateJobApplicationParams): Promise<Result> {

    const repository = new UserRepository();
    const user = await repository.getById(params.idCandidate);
    if (!user) {
      return UsecaseResponse.notFound("User");
    }

    const jobRepository = new JobRepository();
    const job = await jobRepository.getById(params.idJob);
    if (!job) {
      return UsecaseResponse.notFound("Job");
    }

    if (job.limitDate < new Date()) {
      return UsecaseResponse.invalidField(
        "Deadline",
        "Job is not accepting applications anymore"
      );
    }

    if (!job.isActive) {
      return UsecaseResponse.invalidField("Job", "Job is inactive");
    }

    const jobApplicationRepository = new JobApplicationRepository();
    const applications = await jobApplicationRepository.listByJobId(job.id);

    if (job.maxCandidates && job.maxCandidates <= applications.length) {
      return UsecaseResponse.invalidField(
        "Job",
        "Job applications already fullfiled"
      );
    }

    if (
      applications.some((application) => application.candidate.id === user.id)
    ) {
      return UsecaseResponse.invalidField(
        "Candidate",
        "Candidate already subscribed"
      );
    }

    const jobApplication = new JobApplication(user, job, new Date());
    await jobApplicationRepository.create(jobApplication);

    return UsecaseResponse.success(
      "Job Application successfully created",
      jobApplication
    );
  }
}