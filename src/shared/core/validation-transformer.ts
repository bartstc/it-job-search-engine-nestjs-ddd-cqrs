import { ObjectSchema } from 'yup';

import { Result } from './Result';

interface SchemaErrors {
  [key: string]: string;
}

export class ValidationTransformer {
  static validateDto(schemaErrors: SchemaErrors, results: Result<any>[]) {
    const errorFields = schemaErrors;

    results.forEach(result => {
      if (!result.isSuccess) {
        const err = this.split(result.errorValue().message);
        errorFields[err.key] = err.value;
      }
    });

    if (Object.keys(errorFields).length > 0) {
      return Result.fail({
        message: 'Validation error',
        error: {
          fields: errorFields,
        },
      });
    }
  }

  private static split(value: string) {
    const index = value.lastIndexOf('.');
    const splitted = this.splitAt(index)(value);

    return {
      key: splitted[0],
      value: splitted[1],
    };
  }

  private static splitAt = (index: number) => (str: string) => [
    str.slice(0, index),
    str.slice(index + 1),
  ];

  static async validateSchema<T extends object>(
    schema: ObjectSchema<T>,
    props: T,
  ): Promise<SchemaErrors | undefined> {
    let errors;

    try {
      // todo: override messages
      await schema.validate(props, { abortEarly: false });
    } catch (err) {
      errors = this.extractError(err);
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }
  }

  private static extractError(err: any) {
    return err.inner.reduce((acc, err) => {
      return { ...acc, [err.path]: err.message };
    }, {});
  }
}
