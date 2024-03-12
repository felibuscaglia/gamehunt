import { ValidationError } from '@nestjs/common';

export const formatValidationErrors = (errors: ValidationError[]) => {
  const formattedErrors = {};

  errors.forEach((error) => {
    const constraints = error.constraints;
    if (constraints) {
      formattedErrors[error.property] = Object.values(constraints).reverse();
    }
  });

  return formattedErrors;
};
