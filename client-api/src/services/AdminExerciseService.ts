/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExerciseCreateDto } from '../models/ExerciseCreateDto';
import type { ExerciseDetailDto } from '../models/ExerciseDetailDto';
import type { ExerciseGenerateDto } from '../models/ExerciseGenerateDto';
import type { ExerciseTranslationReqDto } from '../models/ExerciseTranslationReqDto';
import type { ExerciseUpdateDto } from '../models/ExerciseUpdateDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminExerciseService {
  /**
   * @param requestBody
   * @returns ExerciseDetailDto
   * @throws ApiError
   */
  public static create(
    requestBody: ExerciseCreateDto,
  ): CancelablePromise<ExerciseDetailDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/admin/exercise',
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
    requestBody: ExerciseUpdateDto,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/admin/exercise/{id}',
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
      url: '/api/admin/exercise/{id}',
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
  /**
   * @param requestBody
   * @returns ExerciseTranslationReqDto
   * @throws ApiError
   */
  public static translate(
    requestBody: ExerciseTranslationReqDto,
  ): CancelablePromise<ExerciseTranslationReqDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/admin/exercise/translate',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param requestBody
   * @returns ExerciseDetailDto
   * @throws ApiError
   */
  public static generate(
    requestBody: ExerciseGenerateDto,
  ): CancelablePromise<ExerciseDetailDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/admin/exercise/generate',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
