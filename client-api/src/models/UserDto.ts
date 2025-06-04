/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserDto = {
  /**
   * Unique identifier of the user
   */
  userId: number;
  /**
   * Name of the user
   */
  name: string;
  /**
   * List of roles assigned to the user
   */
  roles: Array<'user' | 'admin'>;
};

