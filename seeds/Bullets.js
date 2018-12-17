
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bullet').del()
    .then(function () {
      // Inserts seed entries
      return knex('bullet').insert([
        {id: 1, title: 'teste', description: 'testeteste', done: true, date: '2018-12-17'},
        {id: 2, title: 'teste', description: 'testeteste', done: true, date: '2018-12-18'},
        {id: 3, title: 'teste', description: 'testeteste', done: false, date: '2018-12-19'}
      ]);
    });
};
