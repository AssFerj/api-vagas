import { Request, Response } from "express";
import { CreateJobApplicationUsecase } from "../usecases/create-job-application.usecase";
import { ListJobsApplication } from "../usecases/list-job-application.usecase";

export class JobApplicationController {
  public async create(req: Request, res: Response) {
    try {
      const { idJob } = req.params;
      const { loggedUserId } = req.headers;

      const usecase = new CreateJobApplicationUsecase();
      const result = await usecase.execute({
        idJob,
        idCandidate: loggedUserId as string,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async listByCandidate(req: Request, res: Response) {
    try {
      const { loggedUserId } = req.headers;
      const usecase = new ListJobsApplication();
      const result = await usecase.execute(loggedUserId as string);
      return res.status(result.code).send(result);
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}