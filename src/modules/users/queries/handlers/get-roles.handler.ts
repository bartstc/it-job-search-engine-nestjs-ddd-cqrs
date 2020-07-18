import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { BaseController, AppError } from 'shared/core';

import { GetRolesQuery } from '../impl';
import { GetRolesUseCase, GetRolesErrors } from '../../useCases/getRoles';

@QueryHandler(GetRolesQuery)
export class GetRolesHandler extends BaseController
  implements IQueryHandler<GetRolesQuery> {
  constructor(private getRolesUseCase: GetRolesUseCase) {
    super();
  }

  logger = new Logger('GetRolesQuery');

  async execute({ getRolesDto, res }: GetRolesQuery) {
    try {
      const result = await this.getRolesUseCase.execute(getRolesDto);

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetRolesErrors.InvalidContextTypeError:
          case AppError.ValidationError:
            return this.clientError(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Roles successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
