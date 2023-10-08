import { Global, Module } from '@nestjs/common';

const API_KEY = 'LK2345';
const API_KEY_PROD = 'PROD54';

@Global()
@Module({
  providers: [
    {
      provide: 'API KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API KEY'],
})
export class DatabaseModule {}
