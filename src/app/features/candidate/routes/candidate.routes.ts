import { Router } from "express";
import { CandidateController } from "../controllers/candidate.controller";
import { RecruiterValidator } from "../../recruiter/validators/recruiter.validator";
import { LoginValidator } from "../../user/validators/login.validators";

export const candidateRoutes = () => {
  const app = Router();

  const logged = [
    LoginValidator.checkToken,
    RecruiterValidator.checkRecruiterToken,
  ];

  app.post("/", new CandidateController().create);
  app.get("/", logged, new CandidateController().list);

  return app;
};