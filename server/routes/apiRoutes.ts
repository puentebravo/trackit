import express from "express";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const prisma = new PrismaClient({ log: ["query", "error"] });

