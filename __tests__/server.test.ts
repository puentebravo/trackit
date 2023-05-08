import request from "supertest";

const baseUrl = "http://localhost:3001"

describe("server.ts tests", () => {
    test("Is this thing on", async () => {
        const response = await request(baseUrl).get("/api/test")

        expect(response.statusCode).toBe(200);
    })
    
})

