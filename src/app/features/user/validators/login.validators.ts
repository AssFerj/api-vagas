import { NextFunction, Request, Response } from "express";
import { JwtService } from "../../../shared/services/jwt.service";
import { HttpResponse } from "../../../shared/util/http-response.adapter";

export class LoginValidator {
    public static checkToken(req: Request, res: Response, next: NextFunction) {
        try {
            // verificar se um token foi informado
            const token = req.headers.authorization;

            if (!token) {
                return HttpResponse.unauthorized(res);
            }

            // verificar se é um token válido
            const jwtService = new JwtService();
            const isValid = jwtService.verifyTopken(token);

            if (!isValid) {
                return HttpResponse.unauthorized(res);
            }

            next();
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                error: error.toString(),
            });
        }
    }
}