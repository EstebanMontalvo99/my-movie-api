const request = require("supertest");
const app = require("../app");

const BASE_URL = "/api/v1/directors";
let directorId;

test("POST /directors must return a 201 status", async () => {
  const directorBody = {
    firstName: "Pedro",
    lastName: "Juarez",
    nationality: "Ecuadorian",
    image: "image2",
    birthday: "1996-01-01",
  };
  const res = await request(app).post(BASE_URL).send(directorBody);
  expect(res.status).toBe(201);
  directorId = res.body.id;
  expect(res.body.firstName).toBe(directorBody.firstName);
});

test("GET /directors must return a 200  status", async () => {
  const res = await request(app).get(BASE_URL);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /directors/:id must return a 200 status", async () => {
  const directorBody = {
    firstName: "Paco",
  };
  const res = await request(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(directorBody);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(directorBody.firstName);
});

test("DELETE /directors/:id must reutn a 204 status", async () => {
  const res = await request(app).delete(`${BASE_URL}/${directorId}`);
  expect(res.status).toBe(204);
});
