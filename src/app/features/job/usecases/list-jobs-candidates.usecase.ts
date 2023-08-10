import { Result, Usecase, UsecaseResponse } from "../../../shared/util";
import { JobRepository } from "../repositories/job.repository";

export class ListJobsCandidates implements Usecase {
    public async execute(idRecruiter: string): Promise<Result> {
        const repository = new JobRepository();
        const result = await repository.list(idRecruiter);

        if(!result) {
            return UsecaseResponse.notFound('Jobs')
        }

        return {
            ok: true,
            code: 200,
            message: "Jobs and their Candidates are successfully listed",
            data: result,
        };
    }
}