import { Request, Response } from "express";
import { HttpResponse } from "../../../shared/util/http-response.adapter";
import { CreateCandidateUsecase } from "../usecases/create-candidate.usecase";
import { ListCandidateUsecase } from "../usecases/list-candidate.usecase";

export class CandidateController {
  public async create(req: Request, res: Response) {
    try {      const { name, email, password } = req.body;
      if (!name) {
        return HttpResponse.fieldNotProvided(res, "Name");
      }
      if (!email) {
        return HttpResponse.fieldNotProvided(res, "Email");
      }
      if (!password) {
        return HttpResponse.fieldNotProvided(res, "Password");
      }
      const result = await new CreateCandidateUsecase().execute(req.body);

      return res.status(result.code).send(result);
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
  public async list(req: Request, res: Response) {
    try {
      const result = await new ListCandidateUsecase().execute();

      return res.status(result.code).send(result);
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}