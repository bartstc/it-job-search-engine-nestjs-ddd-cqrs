import { ObjectSchema, setLocale } from 'yup';
import { Result } from './Result';

setLocale({
  mixed: {
    required: 'shouldBeDefined',
    notType: 'invalidType',
  },
});

interface DtoErrors {
  [key: string]: string;
}

interface ExtractExceptionsProps<T extends object> {
  dto: T;
  schema: ObjectSchema<T>;
  results?: Result<any>[];
}

export class ValidationTransformer {
  static async extractExceptions<T extends object>({
    dto,
    schema,
    results = [],
  }: ExtractExceptionsProps<T>) {
    const schemaErrors = await this.validateDto(dto, schema);

    const fields = schemaErrors ?? {};

    results.forEach(result => {
      if (!result.isSuccess) {
        const err = this.split(result.errorValue().message);
        fields[err.key] = err.value;
      }
    });

    if (!fields || Object.keys(fields).length === 0) {
      return Result.ok();
    }

    return Result.fail({
      message: 'Validation error',
      error: {
        fields,
      },
    });
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

  private static async validateDto<T extends object>(
    props: T,
    schema: ObjectSchema<T>,
  ): Promise<DtoErrors | undefined> {
    let errors;

    try {
      // todo: override messages
      await schema.validate(props, { abortEarly: false });
    } catch (err) {
      errors = this.mapErrors(err);
    }

    return errors;
  }

  private static mapErrors(err: any) {
    return err.inner.reduce((acc, err) => {
      return { ...acc, [err.path]: err.message };
    }, {});
  }
}
