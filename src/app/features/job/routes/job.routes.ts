import { Router } from "express";
import { JobController } from "../controllers/job.controller";
import { LoginValidator } from "../../user/validators/login.validators";
import { RecruiterValidator } from "../../recruiter/validators/recruiter.validator";


export const jobRoute = () => {
  const app = Router();

  const logged = [
    LoginValidator.checkToken,
    RecruiterValidator.checkRecruiterToken,
  ];

  app.post("/", logged, new JobController().create);

  app.get("/:idJob/candidate", logged, new JobController().listByJob);

  app.get("/", logged, new JobController().list);

  return app;
};