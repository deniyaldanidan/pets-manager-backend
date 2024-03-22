import { BadRequestException, ValidationError } from '@nestjs/common';

export class MyValidationException extends BadRequestException {
  constructor(public validationErrors: Record<string, unknown>) {
    super(validationErrors);
  }
}

export const validationExceptionFactory = (errors: ValidationError[]) => {
  const errObj = {};
  errors.forEach((err) => {
    errObj[err.property] = [...Object.values(err.constraints)];
  });

  return new MyValidationException(errObj);
};
