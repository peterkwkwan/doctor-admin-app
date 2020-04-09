var faker = require('faker');

var database = { doctors: []};

for (var i = 1; i<= 20; i++) {
  database.doctors.push({
    id: i,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    status: faker.lorem.word(),
    gender: 'male',
    effective_date: faker.date.past(),
    expiry_date: faker.date.future(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    address: faker.address.streetName()
  });
}

console.log(JSON.stringify(database));