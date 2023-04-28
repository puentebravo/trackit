import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function runSeed() {
  await prisma.$connect();

  await prisma.user.create({
    data: {
        username: "aJensen",
    }
  })


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

runSeed().then(async () => {
    await prisma.$disconnect()
}).catch( async (e) => {
    console.error(e)
    await prisma.$disconnect();
    process.exit(1)
});
