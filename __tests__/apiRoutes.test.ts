import e from "express";
import request from "supertest";

const baseUrl = "http://localhost:3001"

describe("api route tests", () => {
    test("/workout should return a 200 code", async () => {
       const response = await request(baseUrl).get("/api/workout")

       expect(response.statusCode).toBe(200);
    } )

    test("/rep should return a 200 status code", async () => {
        const response = await request(baseUrl).post("/api/rep").send({
            reps_completed: 5,
            userId: "643f4044ca7b932abdf9fb1c",
            workoutName: "Squats"
        })

        expect(response.statusCode).toBe(200);
    })
})

