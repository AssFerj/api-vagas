import { Router } from "express";
import { JobApplicationController } from "../controllers/job-application.controller";
import { LoginValidator } from "../../features/user/validators/login.validators";
import { CandidateValidator } from "../../features/candidate/validators/candidate.validator";

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