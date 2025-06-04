/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RegisterDto = {
  /**
   * The name of the user
   */
  name: string;
  /**
   * The email of the user, required if phone is not provided
   */
  email?: string;
  /**
   * The phone number of the user, required if email is not provided
   */
  phone?: string;
  /**
   * The password of the user, must be strong
   */
  password: string;
};

