import { PrismaClient } from '@prisma/client';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidBreed(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidBreed',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const petType = args.object['type'];
          if (petType === ('CAT' as const) || petType === ('DOG' as const)) {
            if (typeof value === 'number') {
              try {
                const prisma = new PrismaClient();
                const breedFound = await prisma.breed.findUnique({
                  where: { id: value, type: petType },
                });
                if (breedFound) {
                  return true;
                }
              } catch (error) {
                console.log(error);
                return false;
              }
            }
          }
          return false;
        },
      },
    });
  };
}
