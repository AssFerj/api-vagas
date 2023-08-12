import { CacheRepository } from "../../../shared/database/repository/cache.repository";
import { Result, Usecase, UsecaseResponse } from "../../../shared/util";
import { JobRepository } from "../repositories/job.repository";

export class ListJobsCandidates implements Usecase {
    public async execute(idRecruiter: string): Promise<Result> {
        const repository = new JobRepository();
        const cacheRespository = new CacheRepository();
        const cacheResult = await cacheRespository.get(`jobs-${idRecruiter}`);

        if(cacheResult) {
            return {
                ok: true,
                code: 200,
                message: "Jobs and their Candidates are successfully listed in cache",
                data: cacheResult,
            };
        }

        const result = await repository.list(idRecruiter);

        if(!result) {
            return UsecaseResponse.notFound('Jobs')
        }

        await cacheRespository.set(`jobs-${idRecruiter}`, result);

        return {
            ok: true,
            code: 200,
            message: "Jobs and their Candidates are successfully listed",
            data: result,
        };
    }
}