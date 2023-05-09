import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function runSeed() {
  const salt = bcrypt.genSaltSync(10);

  const hash = bcrypt.hashSync("ineveraskedforthis", salt);

  await prisma.$connect();

  await prisma.user.create({
    data: {
      username: "aJensen",
      name: "Adam Jensen",
      isFederated: false,
      password: hash,
    },
  });

  await prisma.workout.createMany({
    data: [
      {
        name: "Push ups",
      },
      {
        name: "Pull ups",
      },
      {
        name: "Squats",
      },
      {
        name: "Sit-ups",
      },
      {
        name: "Squat-thrusts",
      },
    ],
  });
}

runSeed()
  .then(async () => {
    console.log("Seeding complete.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
