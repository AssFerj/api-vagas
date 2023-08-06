import { Router } from "express";
import { RecruiterController } from "../controllers/recruiter.controller";
import { jobApplicationRoutes } from "../../../job-application/routes/job-application.routes";
import { LoginValidator } from "../../user/validators/login.validators";
import { RecruiterValidator } from "../validators/recruiter.validator";

export const recruiterRoutes = () => {
  const app = Router();

  const logged = [
    LoginValidator.checkToken,
    RecruiterValidator.checkRecruiterToken,
  ];

  app.get("/", logged, new RecruiterController().list);
  app.post("/", new RecruiterController().create);

  app.use("/:idJob/application", logged, jobApplicationRoutes());

  return app;
};