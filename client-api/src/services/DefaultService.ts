/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
  /**
   * @returns any The server is up and running
   * @throws ApiError
   */
  public static appControllerPing(): CancelablePromise<{
    message?: string;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/ping',
    });
  }
}
