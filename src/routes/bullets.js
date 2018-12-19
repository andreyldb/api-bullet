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
  },
  {
    method: "POST",
    path: "/bullets",
    handler: (request, reply) => {
      try {
        let { title, description } = JSON.parse(request.payload);
        if (title === undefined) {
          title = "";
          return reply.response({ error: "undefined title" }).code(400);
        }
        if (description === undefined) {
          description = "";
        }
        const bullet = {
          title: title,
          description: description,
          done: false,
          date: '2018-12-19',
        };
        return knex
          .into("bullet")
          .insert(bullet)
          .returning("id")
          .then(result => {
            bullet.id = result[0];
            return reply.response({ status: "inserted", data: bullet }).code(201);
          })
          .catch(err => {
            return reply.response(err).code(400);
          });
      } catch (err) {
        return reply
          .response({ error: "undefined bullet in json object" })
          .code(400);
      }
    }
  },
  {
    method: "PUT",
    path: "/bullets/{bullet_id}",
    handler: (request, reply) => {
      try {
        const { title, description } = JSON.parse(request.payload);
        const id = request.params.bullet_id;
        let bullet = {};
        if (title != undefined) {
          bullet.title = title;
        }
        if (description != undefined) {
          bullet.description = description;
        }
        return knex("bullet")
          .where("id", id)
          .update(bullet)
          .then(result =>
            knex("bullet")
              .where("id", id)
              .select("id", "title", "description", "done", "date")
              .then(result =>
                reply.response({ status: "updated", data: result[0] }).code(200)
              )
          )
          .catch(err => reply.response(err).code(401));
      } catch (err) {
        return reply.response(err).code(401);
      }
    }
  },
  {
    method: "PUT",
    path: "/bullets/{bullet_id}/done",
    handler: (request, reply) => {
      try {
        const id = request.params.bullet_id;
        let bullet = { done: true };
        return knex("bullet")
          .where("id", id)
          .update(bullet)
          .then(result =>
            knex("bullet")
              .where("id", id)
              .select("id", "title", "description", "done", "date")
              .then(result =>
                reply.response({ status: "done", data: result[0] }).code(200)
              )
          )
          .catch(err => reply.response(err).code(401));
      } catch (err) {
        return reply.response(err).code(401);
      }
    }
  },
  {
    method: "PUT",
    path: "/bullets/{bullet_id}/undone",
    handler: (request, reply) => {
      try {
        const id = request.params.bullet_id;
        let bullet = { done: false };
        return knex("bullet")
          .where("id", id)
          .update(bullet)
          .then(result =>
            knex("bullet")
              .where("id", id)
              .select("id", "title", "description", "done", "date")
              .then(result =>
                reply.response({ status: "undone", data: result[0] }).code(200)
              )
          )
          .catch(err => reply.response(err).code(401));
      } catch (err) {
        return reply.response(err).code(401);
      }
    }
  },
  {
    method: "DELETE",
    path: "/bullets/{bullet_id}",
    handler: (request, reply) => {
      const id = request.params.bullet_id;
      return knex("bullet")
        .where("id", id)
        .update({ deleted: true })
        .then(result => {
          console.log(result);
          if (result === 0) {
            return reply
              .response({
                status: "not deleted",
                message: "bullet not found!"
              })
              .code(409);
          } else {
            return knex("bullet")
              .where("id", id)
              .select("id", "title", "description", "done", "date")
              .then(result =>
                reply.response({ status: "deleted", data: result[0] }).code(200)
              );
          }
        })
        .catch(err => reply.response(err).code(401));
    }
  }

];

export default bullets;
