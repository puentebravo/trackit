import express from "express";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const prisma = new PrismaClient({ log: ["query", "error"] });

router.get("/api/test", async (req: Request, res: Response) => {

  res.json({
    message: "Systems nominal."
  })
})

router.get("/api/workout", async (req: Request, res: Response) => {
  const workouts = await prisma.workout.findMany();

  const workout = workouts[Math.floor(Math.random() * workouts.length)];
  console.log(workout)
  res.json(workout);
});

router.post("/api/rep", async (req: Request, res: Response) => {
  const newWorkout = await prisma.reps.create({
    data: {
      reps_completed: req.body.reps_completed,
      workoutName: req.body.workoutName,
      userId: req.body.userId
    },
  });

  res.json(newWorkout);
});



module.exports = router;
