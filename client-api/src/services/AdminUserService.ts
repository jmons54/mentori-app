/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { UserDto } from '../models/UserDto';
import type { UserEntity } from '../models/UserEntity';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminUserService {
  /**
   * @param requestBody
   * @returns UserDto
   * @throws ApiError
   */
  public static create(
    requestBody: CreateUserDto,
  ): CancelablePromise<UserDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/admin/user',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static update(
    id: number,
    requestBody: UserEntity,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/admin/user/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id The ID of the exercise to delete
   * @param requestBody
   * @returns void
   * @throws ApiError
   */
  public static active(
    id: number,
    requestBody: {
      active?: boolean;
    },
  ): CancelablePromise<void> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/admin/user/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        404: `Exercise not found.`,
      },
    });
  }
}
