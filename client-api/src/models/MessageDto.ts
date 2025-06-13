/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserDto } from './UserDto';
export type MessageDto = {
  id: number;
  sender: UserDto;
  recipient: UserDto;
  content: string;
  createdAt: string;
};

