import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { citiesData } from 'src/data/citiesData';

export function IsValidCity(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidCity',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const state = args.object['state'];
          if (typeof state === 'string' && typeof value === 'string') {
            const foundState = citiesData.find(
              (stateData) =>
                stateData.stateName.toLowerCase() === state.toLowerCase(),
            );
            if (foundState) {
              const foundCity = foundState.cities.find(
                (city) => city.toLowerCase() === value.toLowerCase(),
              );
              if (foundCity) return true;
            }
          }
          return false;
        },
      },
    });
  };
}
