export interface signupDTO {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface loginDTO {
  email: string;
  password: string;
}
