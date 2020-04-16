var faker = require('faker');

var database = { doctors: [], clinics: [], service_providers: []};

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
    address: faker.address.streetAddress(),
    clinics: [{
        id: i
      }]
  });
  database.clinics.push({
    id: i,
    name: faker.company.companyName(),
    description: faker.lorem.paragraph(),
    address: faker.address.streetAddress(),
    service_providers: [{
      id: i
    }],
    doctor: {
      id: i
    }
  });
  database.service_providers.push({
    id: i,
    name: faker.company.companyName(),
    effective_date: faker.date.past(),
    expiry_date: faker.date.future(),
    clinic: [{
      id: i
    }]
  });
}

console.log(JSON.stringify(database));