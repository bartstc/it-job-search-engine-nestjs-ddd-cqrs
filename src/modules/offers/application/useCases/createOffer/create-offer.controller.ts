import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { BaseController, ValidationTransformer } from 'shared/core';

import { OfferService } from '../../services';
import { CreateOfferDto } from './create-offer.dto';
import { CreateOfferResponse } from './create-offer.use-case';
import { createOfferSchema } from './create-offer.schema';

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
      const formErrors = await ValidationTransformer.validateSchema(
        createOfferDto,
        createOfferSchema,
      );

      if (formErrors.isLeft()) {
        return this.clientError(res, formErrors.value.errorValue());
      }

      const result: CreateOfferResponse = await this.offerService.createOffer(
        createOfferDto,
      );

      if (result.isLeft()) {
        const error = result.value;
        this.logger.error(error.errorValue());

        return this.fail(res, error.errorValue());
      }

      this.logger.verbose('Offer successfully created');
      return this.ok(res);
    } catch (err) {
      this.logger.error(err);
      return this.fail(res, err);
    }
  }
}
