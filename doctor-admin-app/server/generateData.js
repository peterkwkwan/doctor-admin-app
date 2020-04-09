var faker = require('faker');

var database = { doctors: []};

for (var i = 1; i<= 10; i++) {
  database.doctors.push({
    id: i,
    username: faker.name.firstName() + faker.name.lastName(),
    userRoles: [
        {
            role: faker.lorem.word(),
        }
    ],
    userContacts: [
        {
            type: 'email',
            detail: faker.internet.email()
        }
    ]
  });
}

console.log(JSON.stringify(database));