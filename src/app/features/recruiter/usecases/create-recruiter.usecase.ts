import { Recruiter } from "../../../models/recruiter.model";
import { Result, Usecase } from "../../../shared/util";
import { UserRepository } from "../../user/repositories/user.repository";

interface CreateRecruiterParams {
  name: string;
  email: string;
  password: string;
  enterpriseName: string;
}

export class CreateRecruiterUsecase implements Usecase {
  public async execute(params: CreateRecruiterParams): Promise<Result> {

    const repository = new UserRepository();
    const user = await repository.getByEmail(params.email);

    if (user) {
      return {
        ok: false,
        message: "User already exists",
        code: 400,
      };
    }

    const recruiter = new Recruiter(
      params.name,
      params.email,
      params.password,
      params.enterpriseName
    );
    await repository.create(recruiter);

    return {
      ok: true,
      message: "Recruiter successfully created",
      code: 201,
    };
  }
}