const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const arrAreaCodes = [
  '300',
  '301',
  '302',
  '303',
  '304',
  '305',
  '310',
  '311',
  '312',
  '313',
  '314',
  '315',
  '316',
  '317',
  '318',
  '320',
  '321',
  '322',
  '323',
  '350',
  '351',
];

// Cantidad de registros
const NUM_USERS = 1000;
const MIN_TRANSACTIONS = 1;
const MAX_TRANSACTIONS = 20;

// Función para generar números de teléfono colombianos
const generateColombianPhoneNumber = () => {
  const areaCode = faker.helpers.arrayElement(arrAreaCodes);
  const part1 = faker.number.int({ min: 100, max: 999 }).toString();
  const part2 = faker.number.int({ min: 1000, max: 9999 }).toString();
  return `${areaCode} ${part1} ${part2}`;
};

// Función para hash de contraseñas
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

async function main() {
  // Generar usuarios
  const users = await Promise.all(
    Array.from({ length: NUM_USERS }, async () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      emailVerified: faker.datatype.boolean() ? faker.date.recent() : null,
      image: faker.image.avatar(),
      phone: generateColombianPhoneNumber(),
      role: faker.helpers.arrayElement(['USER', 'ADMIN']),
      password: await hashPassword(faker.internet.password()),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    })),
  );

  // Insertar todos los usuarios
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
