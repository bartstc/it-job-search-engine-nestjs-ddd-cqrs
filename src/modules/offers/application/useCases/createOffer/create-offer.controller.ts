import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AppError, BaseController } from 'shared/core';

import { OfferService } from '../../services';
import { CreateOfferDto } from './create-offer.dto';
import { CreateOfferResponse } from './create-offer.use-case';

@Controller()
export class CreateOfferController extends BaseController {
  constructor(private readonly offerService: OfferService) {
    super();
  }

  logger = new Logger('CreateOfferController');

  @Post('offers')
  async createOffer(
    @Body() createOfferDto: CreateOfferDto,
    @Res() res: Response,
  ) {
    try {
      const result: CreateOfferResponse = await this.offerService.createOffer(
        createOfferDto,
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        switch (error.constructor) {
          case AppError.ValidationError:
            return this.clientError(res, error.errorValue());
          default:
            return this.fail(res, error.errorValue());
        }
      }

      this.logger.verbose('Offer successfully created');
      return this.ok(res);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
