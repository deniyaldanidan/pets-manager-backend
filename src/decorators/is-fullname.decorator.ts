import { registerDecorator, ValidationOptions } from 'class-validator';
import validator from 'validator';

export function IsFullname(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isFullname',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value === 'string') {
            if (
              validator.isAlphanumeric(value, 'en-US', { ignore: ' .' }) &&
              validator.isLength(value, { min: 2, max: 30 })
            ) {
              return true;
            }
          }
          return false;
        },
      },
    });
  };
}
