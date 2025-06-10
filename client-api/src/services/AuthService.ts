/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GoogleAuthDto } from '../models/GoogleAuthDto';
import type { LoginDto } from '../models/LoginDto';
import type { RegisterDto } from '../models/RegisterDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
  /**
   * @param formData
   * @returns any User successfully registered
   * @throws ApiError
   */
  public static register(
    formData: RegisterDto,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/register',
      formData: formData,
      mediaType: 'multipart/form-data',
    });
  }
  /**
   * @param requestBody
   * @returns LoginDto
   * @throws ApiError
   */
  public static auth(
    requestBody: {
      /**
       * User identifier (could be email or phone)
       */
      identifier: string;
      /**
       * User password
       */
      password: string;
    },
  ): CancelablePromise<LoginDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/login',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param requestBody
   * @returns LoginDto
   * @throws ApiError
   */
  public static googleAuth(
    requestBody: GoogleAuthDto,
  ): CancelablePromise<LoginDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/auth/google',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
