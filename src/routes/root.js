const root = {
  method: "GET",
  path: "/",
  handler: (request, reply) => ({
    version: "0.0.1",
    title: "API do Bullet Jornal da Alê e do Andrey"
  })
};

export default root;
