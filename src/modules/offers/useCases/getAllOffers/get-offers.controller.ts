import { Controller, Get, Logger, Res } from '@nestjs/common';
import { BaseController } from '../../../../shared/core';
import { Response } from 'express';
import { OffersService } from '../../services/offers.service';
import { GetOffersResponse } from './get-offers.use-case';

@Controller()
export class GetOffersController extends BaseController {
  constructor(private readonly offersService: OffersService) {
    super();
  }

  logger = new Logger('GetOffersController');

  @Get('offers')
  async getAllOffers(@Res() res: Response) {
    try {
      const result: GetOffersResponse = await this.offersService.getAllOffers();

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        return this.fail(res, error.errorValue());
      }

      this.logger.verbose('Offers successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
