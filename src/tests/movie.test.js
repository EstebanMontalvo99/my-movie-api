const request = require("supertest");
const app = require("../app.js");
require("../models");
const Movie = require("../models/Movie.js");
const Genre = require("../models/Genre.js");
const Director = require("../models/Director.js");
const Actor = require("../models/Actor.js");
const { expectCt } = require("helmet");

const BASE_URL = "/api/v1/movies";
let movieId;

test("POST /movies return a 201 status", async () => {
  const movieBody = {
    name: "NBD",
    image: "ss",
    synopsis: "hola",
    releaseYear: 1999,
  };
  const res = await request(app).post(BASE_URL).send(movieBody);
  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(movieBody.name);
});

test("GET /movies returns a 200 status", async () => {
  const res = await request(app).get(BASE_URL);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /movies/:id must return a status 200", async () => {
  const movieBody = {
    name: "NBD 3",
  };
  const res = await request(app).put(`${BASE_URL}/${movieId}`).send(movieBody);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(movieBody.name);
});

test("POST   /movies/:id/genres must return a 201 status", async () => {
  const genreBody = {
    name: "Comedy",
  };
  const createGenre = await Genre.create(genreBody);
  const genreID = [createGenre.id];

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send(genreID);

  await createGenre.destroy();

  expect(res.status).toBe(201);
});

test("POST   /movies/:id/actors must return a 201 status", async () => {
  const actorBody = {
    firstName: "Juan",
    lastName: "Pedro",
    nationality: "Ecuadorian",
    image: "image1",
    birthday: "1999-10-10",
  };
  const createActor = await Actor.create(actorBody);
  const actorID = [createActor.id];

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send(actorID);

  await createActor.destroy();

  expect(res.status).toBe(201);
});

test("POST   /movies/:id/directors must return a 201 status", async () => {
  const directorBody = {
    firstName: "Pedro",
    lastName: "Juarez",
    nationality: "Ecuadorian",
    image: "image2",
    birthday: "1996-01-01",
  };
  const createDirector = await Director.create(directorBody);
  const directorID = [createDirector.id];

  const res = await request(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send(directorID);

  await createDirector.destroy();

  expect(res.status).toBe(201);
});

test("DELETE /movies/:id returns a 204 status", async () => {
  const res = await request(app).delete(`${BASE_URL}/${movieId}`);
  expect(res.status).toBe(204);
});
