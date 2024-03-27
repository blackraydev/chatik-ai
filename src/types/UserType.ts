export type UserType = {
  id: number;
  tariff: 'free' | 'premium';
  firstName: string;
  lastName?: string;
  photoURL?: string;
};
