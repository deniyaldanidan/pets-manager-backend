import { registerDecorator, ValidationOptions } from 'class-validator';
import { citiesData } from 'src/data/citiesData';

export function IsValidState(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidState',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value === 'string') {
            const foundState = citiesData.find(
              (state) => state.stateName.toLowerCase() === value.toLowerCase(),
            );
            if (foundState) {
              return true;
            }
          }
          return false;
        },
      },
    });
  };
}
