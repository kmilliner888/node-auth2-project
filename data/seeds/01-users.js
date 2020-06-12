
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'user1', password: '123abc', department: 'Science'},
        {id: 2, username: 'user2', password: 'password123', department: 'English'},
        {id: 3, username: 'user3', password: 'abcpassword', department: 'Math'}
      ]);
    });
};
