import { UserType } from "../../../models/user-type.model";
import { User } from "../../../models/user.model";
import { CacheRepository } from "../../../shared/database/repository/cache.repository";
import { Result, Usecase } from "../../../shared/util";
import { UserRepository } from "../../user/repositories/user.repository";

interface CreateCandidateParams {
  name: string;
  email: string;
  password: string;
}

export class CreateCandidateUsecase implements Usecase {
  public async execute(params: CreateCandidateParams): Promise<Result> {
    const repository = new UserRepository();
    const cacheRepository = new CacheRepository();
    const user = await repository.getByEmail(params.email);

    if (user) {
      return {
        ok: false,
        message: "User already exists",
        code: 400,
      };
    }

    const candidate = new User(
      params.name,
      params.email,
      params.password,
      UserType.Candidate
    );

    await repository.create(candidate);
    await cacheRepository.delete('candidate');

    return {
      ok: true,
      message: "Candidate successfully created",
      code: 201,
    };
  }
}