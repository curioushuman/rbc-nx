import { Transform } from 'class-transformer';
import { getPrimaryEmail, createPrimaryEmail } from '../members-email.service';

export function PrimaryEmail() {
  return Transform(({ obj }) => getPrimaryEmail(obj));
}

export function CreatePrimaryEmail(): PropertyDecorator {
  return Transform(({ obj }) => [createPrimaryEmail(obj.email)]);
}
