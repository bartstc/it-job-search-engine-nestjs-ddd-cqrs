import * as express from 'express';

interface JsonBody {
  message: string;
  signature?: string;
  error?: string;
}

export abstract class BaseController {
  public static jsonResponse(
    res: express.Response,
    code: number,
    body: JsonBody,
  ) {
    return res.status(code).json({ ...body });
  }

  public created(res: express.Response) {
    return res.sendStatus(201);
  }

  public clientError(res: express.Response, { message, signature }: JsonBody) {
    return BaseController.jsonResponse(res, 400, {
      message: message ?? 'Unauthorized',
      signature: signature ?? `unauthorized`,
    });
  }

  public unauthorized(res: express.Response, { message, signature }: JsonBody) {
    return BaseController.jsonResponse(res, 401, {
      message: message ?? 'Unauthorized',
      signature: signature ?? `unauthorized`,
    });
  }

  public paymentRequired(
    res: express.Response,
    { message, signature }: JsonBody,
  ) {
    return BaseController.jsonResponse(res, 402, {
      message: message ?? 'Payment required',
      signature: signature ?? `paymentRequired`,
    });
  }

  public forbidden(res: express.Response, { message, signature }: JsonBody) {
    return BaseController.jsonResponse(res, 403, {
      message: message ?? 'Unauthorized',
      signature: signature ?? `unauthorized`,
    });
  }

  public notFound(res: express.Response, { message, signature }: JsonBody) {
    return BaseController.jsonResponse(res, 404, {
      message: message ?? 'Not found',
      signature: signature ?? `notFound`,
    });
  }

  public conflict(res: express.Response, { message, signature }: JsonBody) {
    return BaseController.jsonResponse(res, 409, {
      message: message ?? 'Conflict',
      signature: signature ?? `conflict`,
    });
  }

  public tooMany(res: express.Response, { message, signature }: JsonBody) {
    return BaseController.jsonResponse(res, 429, {
      message: message ?? 'Too many requests',
      signature: signature ?? 'tooManyRequests',
    });
  }

  public ok<T>(res: express.Response, dto?: T) {
    if (!!dto) {
      res.type('application/json');
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public fail<T>(res: express.Response, error: T | string) {
    const err = typeof error === 'string' ? { message: error } : error;
    return res.status(500).json(err);
  }
}
