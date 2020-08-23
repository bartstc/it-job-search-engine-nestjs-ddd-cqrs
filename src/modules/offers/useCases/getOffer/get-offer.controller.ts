import { Controller, Get, Logger, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { BaseController } from 'shared/core';

import { OfferService } from '../../services';
import { GetOfferResponse } from './get-offer.use-case';
import { GetOfferErrors } from './get-offer.errors';

@Controller()
export class GetOfferController extends BaseController {
  constructor(private readonly offerService: OfferService) {
    super();
  }

  logger = new Logger('GetOfferController');

  @Get('offer/:offerId')
  async getOffer(@Param('offerId') offerId: string, @Res() res: Response) {
    try {
      const result: GetOfferResponse = await this.offerService.getOffer(
        offerId,
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case GetOfferErrors.OfferDoesNotExistsError:
            return this.notFound(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Offer successfully returned');
      return this.ok(res, result.value.getValue());
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
