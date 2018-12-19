
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bullet').del()
    .then(function () {
      // Inserts seed entries
      return knex('bullet').insert([
        {id: 1, title: 'Passear com Tobby', description: 'Andar com meu cachorrinho por volta das 16h hoje', done: true, date: '2018-12-17'},
        {id: 2, title: 'Passar de ano em Minora', description: 'Com muito esforço, vanglória e perseverança, eu e Alessandra encerramos este ano aprovados', done: true, date: '2018-12-18'},
        {id: 3, title: 'Feliz Natal e boas festas', description: 'Dos seus alunos favoritos, Alessandra e Andrey', done: false, date: '2018-12-19'}
      ]);
    });
};
