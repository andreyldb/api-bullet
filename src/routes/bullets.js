import knex from "../config/knex";

const requestHandler = (request, reply) => {
  return knex
    .from("bullet")
    // .where({ deleted: false })
    .select("id", "title", "description", "done", "date")
    .then(results => reply.response(results))
    .catch(err => console.log(err));
};

const bullets = [
  {
    method: "GET",
    path: "/bullets",
    handler: (request, reply) => {
      return requestHandler(request, reply);
    }
  },
  {
    method: "GET",
    path: "/bullets/",
    handler: (request, reply) => {
      return requestHandler(request, reply);
    }
  }
];

export default bullets;
