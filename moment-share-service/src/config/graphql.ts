import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { TokenDecoderMiddleware } from '../middlewares/token-decoder.middleware';

export const graphqlConfigOptions = {
  driver: ApolloDriver,
  typePaths: ['./**/*.graphql'],
  definitions: {
    path: join(process.cwd(), 'src/types.ts'),
    outputAs: 'interface',
  },
  buildSchemaOptions: {
    fieldMiddleware: [TokenDecoderMiddleware],
  },
};
