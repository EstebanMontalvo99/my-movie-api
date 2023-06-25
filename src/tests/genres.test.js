const request = require("supertest");
const app = require("../app.js");
const Genre = require("../models/Genre.js");

const BASE_URL = "/api/v1/genres";
let genreID;

test("POST /genres must return a 201 status", async () => {
  const genreBody = {
    name: "Action",
  };
  const res = await request(app).post(BASE_URL).send(genreBody);
  genreID = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(genreBody.name);
});

test("GET /genres must return a 200 status", async () => {
  const res = await request(app).get(BASE_URL);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /genres/:id mus return a 200 status", async () => {
  const genreBody = {
    name: "Comedy",
  };
  const res = await request(app).put(`${BASE_URL}/${genreID}`).send(genreBody);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(genreBody.name);
});

test("DELETE /genres/:id must return a 204 status", async () => {
  const res = await request(app).delete(`${BASE_URL}/${genreID}`);
  expect(res.status).toBe(204);
});
