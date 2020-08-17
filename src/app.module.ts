// https://github.com/ambroiseRabier/typeorm-nestjs-migration-example
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as ormconfig from './ormconfig';
import { UsersModule } from './modules/users/users.module';
import { OffersModule } from './modules/offers/offers.module';

// export function DatabaseOrmModule(): DynamicModule {
//   return TypeOrmModule.forRoot(ormconfig);
// }

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UsersModule, OffersModule],
})
export class AppModule {}
