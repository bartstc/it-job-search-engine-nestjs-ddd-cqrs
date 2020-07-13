// https://github.com/ambroiseRabier/typeorm-nestjs-migration-example
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './modules/users/users.module';
import * as ormconfig from './ormconfig';

// export function DatabaseOrmModule(): DynamicModule {
//   return TypeOrmModule.forRoot(ormconfig);
// }

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UsersModule],
})
export class AppModule {}
