import { CacheRepository } from "../../../shared/database/repository/cache.repository";
import { Usecase, Result } from "../../../shared/util";
import { JobApplicationRepository } from "../repositories/job-application.repository";

export class ListJobsApplication implements Usecase {
  public async execute(idCandidate: string): Promise<Result> {
    const repository = new JobApplicationRepository();
    const cache = new CacheRepository();

    const cacheResult = cache.get('list-job-application');

    if(cacheResult) {
      return {
        ok: true,
        message: "Job Applications successfully listed in cache",
        data: cacheResult,
        code: 200,
      };
    }

    const result = await repository.listByCandidateId(idCandidate);
    const data = result?.map((job) => job?.job.toJson());

    await cache.set('list-job-application', data);

    return {
      ok: true,
      code: 200,
      message: "Jobs application successfully listed",
      data: data,
    };
  }
}