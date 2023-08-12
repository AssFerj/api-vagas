import { UserType } from "../../../models/user-type.model";
import { CacheRepository } from "../../../shared/database/repository/cache.repository";
import { Result } from "../../../shared/util";
import { Usecase } from "../../../shared/util/usecase.contract";
import { UserRepository } from "../../user/repositories/user.repository";

export class ListCandidateUsecase implements Usecase {
  public async execute(): Promise<Result> {
    const repository = new UserRepository();
    const cache = new CacheRepository();

    const cacheResult = await cache.get('list-candidate');

    if(cacheResult) {
      return {
        ok: true,
        message: "Candidates successfully listed in cache",
        data: cacheResult,
        code: 200,
      };
    }

    const result = await repository.list(UserType.Candidate);
    const data = result?.map((candidate) => candidate.toJson());

    await cache.set('list-candidate', data);

    return {
      ok: true,
      message: "Candidates successfully listed",
      data: data,
      code: 200,
    };
  }
}