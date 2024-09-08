const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const authController = require("../controllers/authController");

const app = express();

app.use(express.json());
app.post("/signup", authController.signup);
app.post("/login", authController.login);

// Setup a test database connection
beforeAll(async () => {
  const uri = "mongodb://127.0.0.1:27017/cryptx_test";
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear test database before each test
beforeEach(async () => {
  await User.deleteMany({});
});

// Close the database connection after tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth Controller", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/signup").send({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should log in an existing user", async () => {
    await request(app).post("/signup").send({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    });

    const response = await request(app).post("/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should not log in with invalid credentials", async () => {
    const response = await request(app).post("/login").send({
      email: "invalid@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("msg", "Invalid credentials");
  });
});
