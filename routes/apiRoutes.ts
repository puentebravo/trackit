import express from "express";
import { PrismaClient } from "@prisma/client";
import promptWorkout from "../utils/prompts";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import * as dotenv from "dotenv";

dotenv.config();

declare module "express-session" {
  interface SessionData {
    loggedIn: boolean;
    userId: string;
  }
}

const router = express.Router();
const prisma = new PrismaClient({ log: ["query", "error"] });

router.get("/api/test", async (req: express.Request, res: express.Response) => {
  res.json({
    message: "Systems nominal.",
  });
});

router.get(
  "/api/workout/:time",
  async (req: express.Request, res: express.Response) => {

    const promptTime: string = req.params.time

    const workout = await promptWorkout(promptTime);

    res.json(workout);
  }
);

router.post("/api/rep", async (req: express.Request, res: express.Response) => {
  const newWorkout = await prisma.reps.create({
    data: {
      workout: req.body.workout,
      workoutLength: req.body.length,
      reps: parseInt(req.body.reps)
    }
  })

  res.json(newWorkout);
});

router.post(
  "/api/login",
  async (req: express.Request, res: express.Response) => {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      if (!user.isFederated && user.password) {
        const isValid = bcrypt.compareSync(req.body.password, user.password);

        if (!isValid) {
          res.status(400).json({
            message: "Incorrect login credentials. Please try again!",
          });

          return;
        }

        req.session.save(() => {
          req.session.loggedIn = true;
          req.session.userId = user.id;

          res.status(200).json({
            user: user.id,
            message: "Login successful!",
          });
        });
      }
    } else {
      res.status(400).json({
        message: "User not found.",
      });
    }
  }
);

router.get(
  "/api/logout",
  async (req: express.Request, res: express.Response) => {
    req.session.destroy(() => {
      res.status(200).json({
        message: "Session terminated",
      });
    });
  }
);

router.post(
  "/api/signup/local",
  body(["username, password"]).isAscii(),
  async (req: express.Request, res: express.Response) => {
    const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    try {
      const newUser = await prisma.user.create({
        data: {
          username: req.body.username,
          isFederated: false,
          name: req.body.name,
          password: hash,
        },
      });

      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
);

module.exports = router;
