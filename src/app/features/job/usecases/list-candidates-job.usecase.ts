import { Result, Usecase, UsecaseResponse } from "../../../shared/util";
import { JobRepository } from "../repositories/job.repository";

interface listCandidatesJob {
  idRecruiter: string;
  idJob: string;
}

export class ListCandidatesJob implements Usecase {
  public async execute(params: listCandidatesJob): Promise<Result> {

    const repository = new JobRepository();
    const result = await repository.getById(params.idJob);

    if (!result) {
      return UsecaseResponse.notFound("Job");
    }

    if (result.job.idRecruiter !== params.idRecruiter) {
      return UsecaseResponse.unauthorized();
    }

    return {
      ok: true,
      code: 200,
      message: "Candidates from the Job application successfully listed",
      data: result,
    };
  }
}