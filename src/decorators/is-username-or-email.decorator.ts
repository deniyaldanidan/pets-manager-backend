import { registerDecorator, ValidationOptions } from 'class-validator';
import validator from 'validator';

export function IsUserNameOrEmail(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUserNameOrEmail',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value === 'string') {
            if (
              validator.isAlphanumeric(value, 'en-US', { ignore: '-_' }) &&
              validator.isLength(value, { min: 2, max: 24 })
            ) {
              return true;
            }
            if (validator.isEmail(value)) {
              return true;
            }
          }
          return false;
        },
      },
    });
  };
}
