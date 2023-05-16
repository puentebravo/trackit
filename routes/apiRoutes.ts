import express from "express";
import { PrismaClient } from "@prisma/client";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import * as dotenv from "dotenv";

dotenv.config();

declare module "express-session" {
  interface SessionData {
    loggedIn: boolean;
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
  "/api/workout",
  async (req: express.Request, res: express.Response) => {
    const workouts = await prisma.workout.findMany();

    const workout = workouts[Math.floor(Math.random() * workouts.length)];
    console.log(workout);
    res.json(workout);
  }
);

router.post("/api/rep", async (req: express.Request, res: express.Response) => {
  const newWorkout = await prisma.reps.create({
    data: {
      reps_completed: req.body.reps_completed,
      workoutName: req.body.workoutName,
      userId: req.body.userId,
    },
  });

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
