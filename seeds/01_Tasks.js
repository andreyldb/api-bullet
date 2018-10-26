exports.seed = function(knex, Promise) {
  const tableName = "tasks";
  const data = [
    {
      title: "Planning class",
      description: "",
      deleted: true,
      done: false
    },
    {
      title: "Build React UI",
      description: "",
      deleted: false,
      done: true
    },
    {
      title: "Build React Native UI",
      description: "",
      deleted: false,
      done: false
    },
    {
      title: "Build API",
      description: "",
      deleted: false,
      done: false
    },
    {
      title: "Integrate React UI and API",
      description: "",
      deleted: false,
      done: false
    },
    {
      title: "Integrate React Native UI and API",
      description: "",
      deleted: false,
      done: false
    }
  ];

  // Deletes ALL existing entries
  return knex(tableName)
    .del()
    .then(function() {
      return knex(tableName).insert(data);
    });
};
