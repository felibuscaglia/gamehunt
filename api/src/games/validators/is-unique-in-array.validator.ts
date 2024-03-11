import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsUniqueInArray(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isUniqueInArray',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(_: any, args: ValidationArguments) {
          const entities: any[] = args.object[args.property];
          return (
            entities
              .map((entity: any) => entity[property])
              .filter(
                (val: any, index: number, self: any[]) =>
                  self.indexOf(val) === index,
              ).length === entities.length
          );
        },
      },
    });
  };
}
