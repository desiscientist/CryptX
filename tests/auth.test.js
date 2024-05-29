// tests/auth.test.js

const request = require("supertest");
const express = require("express");
const app = express();
// const User = require(".User.js"); // Assuming this is the User model

// Use the same middleware setup and routes as in your app.js
app.use(express.json()); // Middleware to parse JSON requests
app.use("/api/auth", require("../routes/auth")); // Assuming auth routes are in routes/auth.js

describe("Authentication API", () => {
  // Test user data
  const userData = {
    username: "testuser",
    email: "test@example.com",
    password: "password123",
  };

  // Cleanup after each test
  afterEach(async () => {
    await User.deleteMany(); // Remove all users from the database
  });

  describe("POST /api/auth/signup", () => {
    it("should create a new user", async () => {
      const res = await request(app)
        .post("/api/auth/signup")
        .send(userData)
        .expect(200);

      // Assertions
      expect(res.body).toHaveProperty("token");
      expect(res.body.token).toBeTruthy();
    });

    // Add more test cases for signup route
  });

  describe("POST /api/auth/login", () => {
    it("should login with correct credentials", async () => {
      // Create a user
      await User.create(userData);

      // Login with correct credentials
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: userData.email, password: userData.password })
        .expect(200);

      // Assertions
      expect(res.body).toHaveProperty("token");
      expect(res.body.token).toBeTruthy();
    });

    // Add more test cases for login route
  });
});
