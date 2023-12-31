import { JwtService } from "../../../shared/services/jwt.service";
import { Usecase, Result, UsecaseResponse } from "../../../shared/util";
import { UserRepository } from "../repositories/user.repository";

interface LoginParams {
    email: string;
    password: string;
}

export class LoginUsecase implements Usecase {
    public async execute(params: LoginParams): Promise<Result> {
        const repository = new UserRepository();
        const user = await repository.getByEmail(params.email);

        if (!user) {
            return UsecaseResponse.notFound("User");
        }

        if (user.password !== params.password) {
            return UsecaseResponse.unauthorized();
        }

        const token = new JwtService().createToken(user.toJson());

        return UsecaseResponse.success("Login successfully done", {
            ...user.toJson(),
            token,
        });
    }
}