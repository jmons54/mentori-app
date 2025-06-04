/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExerciseCategoryCreateDto } from '../models/ExerciseCategoryCreateDto';
import type { ExerciseCategoryDto } from '../models/ExerciseCategoryDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ExerciseCategoryService {
  /**
   * @param active
   * @returns ExerciseCategoryDto
   * @throws ApiError
   */
  public static findAll(
    active?: boolean,
  ): CancelablePromise<Array<ExerciseCategoryDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/exercise-category',
      query: {
        'active': active,
      },
    });
  }
  /**
   * @param id
   * @returns ExerciseCategoryDto
   * @throws ApiError
   */
  public static findOne(
    id: number,
  ): CancelablePromise<ExerciseCategoryDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/exercise-category/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @param requestBody
   * @returns ExerciseCategoryDto The exercise category has been successfully created.
   * @throws ApiError
   */
  public static exerciseCategoryControllerCreate(
    requestBody: ExerciseCategoryCreateDto,
  ): CancelablePromise<ExerciseCategoryDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/exercise-category/create',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
