/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type UserRegistration = {
  fullname?: string;
  email?: string;
  password?: string;
  mobile?: string | undefined;
  agreed?: boolean;
  organization?: string;
  country?: string;
  handleInputChange: (event: any) => void;
  step: number;
  nextStep: React.FormEventHandler;
};
