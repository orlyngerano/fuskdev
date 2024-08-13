export type User = {
  id?: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: string;
};

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
