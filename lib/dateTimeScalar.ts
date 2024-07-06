import { GraphQLScalarType, Kind } from 'graphql';

const dateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Date custom scalar type',
  parseValue(value: unknown): Date {
    return new Date(value as string); // convertir el valor de entrada a Date
  },
  serialize(value: unknown): string {
    return (value as Date).toISOString(); // convertir el valor de Date a string para la respuesta
  },
  parseLiteral(ast): Date | null {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value); // convertir el valor de cadena a Date
    }
    return null;
  },
});

export default dateTimeScalar;
