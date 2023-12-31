import { UserType } from "../../../models/user-type.model";
import { CacheRepository } from "../../../shared/database/repository/cache.repository";
import { Result, Usecase } from "../../../shared/util";
import { UserRepository } from "../../user/repositories/user.repository";

export class ListRecruitersUsecase implements Usecase {
  public async execute(): Promise<Result> {
    const repository = new UserRepository();
    const cacheRepository = new CacheRepository();
    
    const cacheResult = await cacheRepository.get('users');

    if(cacheResult) {
      return {
        ok: true,
        message: "Recruiters successfully listed in cache",
        data: cacheResult,
        code: 200,
      };
    }

    const result = await repository.list(UserType.Recruiter);
    const data = result?.map((recruiter) => recruiter.toJson());
    await cacheRepository.set('users', data);

    return {
      ok: true,
      message: "Recruiters successfully listed",
      data: data,
      code: 200,
    };
  }
}