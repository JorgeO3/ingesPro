const { PrismaClient, Role } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

// Configuración para controlar la cantidad de registros
const NUM_USERS = 1000;
const MIN_TRANSACTIONS = 1;
const MAX_TRANSACTIONS = 20;

async function main() {
  // Generar usuarios
  const users = Array.from({ length: NUM_USERS }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    emailVerified: faker.datatype.boolean() ? faker.date.recent() : null,
    image: faker.image.avatar(),
    role: faker.helpers.arrayElement([Role.USER, Role.ADMIN]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  }));

  // Crear usuarios en una sola consulta
  await prisma.user.createMany({
    data: users,
  });

  // Obtener los IDs de los usuarios creados
  const createdUsers = await prisma.user.findMany();

  // Generar transacciones para cada usuario
  const transactions = createdUsers.flatMap((user) =>
    Array.from(
      {
        length: faker.number.int({
          min: MIN_TRANSACTIONS,
          max: MAX_TRANSACTIONS,
        }),
      },
      () => ({
        id: faker.string.uuid(),
        userId: user.id,
        concept: faker.commerce.productName(),
        amount: Number.parseFloat(faker.commerce.price()),
        createdAt: faker.date.past(),
      }),
    ),
  );

  // Guardar transacciones
  await prisma.transaction.createMany({
    data: transactions,
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
