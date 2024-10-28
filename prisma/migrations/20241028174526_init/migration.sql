-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "isFederated" BOOLEAN NOT NULL,
    "name" TEXT,
    "provider" TEXT,
    "password" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reps" (
    "id" TEXT NOT NULL,
    "workout" TEXT NOT NULL,
    "workoutLength" TEXT NOT NULL,
    "reps" INTEGER NOT NULL,

    CONSTRAINT "Reps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
