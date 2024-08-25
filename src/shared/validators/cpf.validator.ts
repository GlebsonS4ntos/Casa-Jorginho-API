import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

// Função que valida o CPF
function isValidCPF(cpf: string): boolean {
  
   // Verifica se o CPF contém apenas números e tem 11 dígitos
   if (!/^\d{11}$/.test(cpf)) {
    return false;
  }

  // CPF inválido se todos os números são iguais
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  let rest;

  // Calcula o primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  rest = (sum * 10) % 11;
  if ((rest === 10) || (rest === 11)) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;
  // Calcula o segundo dígito verificador
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  rest = (sum * 10) % 11;
  if ((rest === 10) || (rest === 11)) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
}

@ValidatorConstraint({ async: false })
export class IsCPFConstraint implements ValidatorConstraintInterface {
  validate(cpf: string, args: ValidationArguments) {
    return isValidCPF(cpf); // Chama a função de validação de CPF
  }

  defaultMessage(args: ValidationArguments) {
    return 'CPF is not valid';
  }
}

// Decorador personalizado para validar CPF
export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCPFConstraint,
    });
  };
}