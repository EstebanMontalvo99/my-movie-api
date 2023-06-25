const request = require("supertest");
const app = require("../app.js");

const BASE_URL = "/api/v1/actors";
let actorId;

test("POST /actors must return a 201 status", async () => {
  const actorBody = {
    firstName: "Juan",
    lastName: "Pedro",
    nationality: "Ecuadorian",
    image: "image1",
    birthday: "1999-10-10",
  };
  const res = await request(app).post(BASE_URL).send(actorBody);
  actorId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(actorBody.firstName);
});

test("GET /actors must return a 200 status", async () => {
  const res = await request(app).get(BASE_URL);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /actors/:id must return a 200 status", async () => {
  const actorBody = {
    firstName: "Pepe",
  };
  const res = await request(app).put(`${BASE_URL}/${actorId}`).send(actorBody);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(actorBody.firstName);
});

test("DELETE actors/:id must return a 204 status", async () => {
  const res = await request(app).delete(`${BASE_URL}/${actorId}`);
  expect(res.status).toBe(204);
});
