/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { UserDto } from '../models/UserDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
  /**
   * @returns UserDto
   * @throws ApiError
   */
  public static me(): CancelablePromise<UserDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/user/me',
    });
  }
  /**
   * Modifier les informations de son propre profil
   * @param requestBody
   * @returns UserDto
   * @throws ApiError
   */
  public static updateMe(
    requestBody: UpdateUserDto,
  ): CancelablePromise<UserDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/user/me',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns UserDto
   * @throws ApiError
   */
  public static findAll(): CancelablePromise<Array<UserDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/user',
    });
  }
}
