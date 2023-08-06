import { Router } from "express";
import { JobApplicationController } from "../controllers/job-application.controller";
import { CandidateValidator } from "../../candidate/validators/candidate.validator";
import { LoginValidator } from "../../user/validators/login.validators";

export const jobApplicationRoutes = () => {
  const app = Router({
    mergeParams: true,
  });

  const logged = [
    LoginValidator.checkToken,
    CandidateValidator.checkCandidateToken,
  ];

  app.post("/", logged, new JobApplicationController().create);
  app.get("/job", logged, new JobApplicationController().listByCandidate);

  return app;
};