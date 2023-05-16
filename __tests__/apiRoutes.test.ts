
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
            workoutName: "Squats",
            userId: "643f4044ca7b932abdf9fb1c"
        })

        expect(response.statusCode).toBe(200);
    })

    test("/login should return a 200 status code", async () => {
        const response = await request(baseUrl).post("/api/login").send({
            username: "aJensen",
            password: "ineveraskedforthis"
        })

        expect(response.statusCode).toBe(200)
    })

    test("/signup/local should return a 200 status code", async () => {

        const rng = Math.floor(Math.random() * 100)
        const response = await request(baseUrl).post("/api/signup/local").send({
            username: `fPritchard${rng}`,
            name: `Frank Pritchard${rng}`,
            password: `whyadamwhy${rng}`
        })

        expect(response.statusCode).toBe(200)
    })

})

