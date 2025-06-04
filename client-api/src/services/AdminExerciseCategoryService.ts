/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExerciseCategoryCreateDto } from '../models/ExerciseCategoryCreateDto';
import type { ExerciseCategoryUpdateDto } from '../models/ExerciseCategoryUpdateDto';
import type { ExerciseDetailDto } from '../models/ExerciseDetailDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminExerciseCategoryService {
  /**
   * @param formData
   * @returns ExerciseDetailDto
   * @throws ApiError
   */
  public static create(
    formData: ExerciseCategoryCreateDto,
  ): CancelablePromise<ExerciseDetailDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/admin/exercise/category',
      formData: formData,
      mediaType: 'multipart/form-data',
    });
  }
  /**
   * @param id
   * @param formData
   * @returns any Exercise category updated successfully
   * @throws ApiError
   */
  public static update(
    id: number,
    formData: ExerciseCategoryUpdateDto,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/admin/exercise/category/{id}',
      path: {
        'id': id,
      },
      formData: formData,
      mediaType: 'multipart/form-data',
      errors: {
        400: `Bad Request`,
        404: `Not Found`,
      },
    });
  }
  /**
   * @param id The ID of the category to delete
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
      url: '/api/admin/exercise/category/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        404: `Category not found.`,
      },
    });
  }
}
