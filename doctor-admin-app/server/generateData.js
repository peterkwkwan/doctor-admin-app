var faker = require('faker');

var database = { doctors: [], clinics: [], service_providers: [], sp_package: []};

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
    doctor: [
      { id: Math.round(Math.random() * 20) },
      { id: Math.round(Math.random() * 20) },
      { id: Math.round(Math.random() * 20) }
    ]
  });
  database.service_providers.push({
    id: i,
    name: faker.company.companyName(),
    effective_date: faker.date.past(),
    expiry_date: faker.date.future(),
    clinic: [{
      id: i
    }],
    sp_package: [
      { id: Math.round(Math.random() * 20) },
      { id: Math.round(Math.random() * 20) },
      { id: Math.round(Math.random() * 20) }
    ]
  });
  database.sp_package.push({
    id: i,
    name: faker.company.companyName(),
    service_providers: [
      { id: Math.round(Math.random() * 20) },
      { id: Math.round(Math.random() * 20) },
      { id: Math.round(Math.random() * 20) },
      { id: Math.round(Math.random() * 20) }
  ]
  })
}

console.log(JSON.stringify(database));