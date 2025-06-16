/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateNewsDto } from '../models/CreateNewsDto';
import type { NewDto } from '../models/NewDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NewsService {
  /**
   * @returns NewDto Liste retournée avec succès
   * @throws ApiError
   */
  public static findAll(): CancelablePromise<Array<NewDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/news',
    });
  }
  /**
   * Créer une actualité avec fichier optionnel
   * @param formData
   * @returns NewDto Actualité créée avec succès
   * @throws ApiError
   */
  public static create(
    formData: CreateNewsDto,
  ): CancelablePromise<NewDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/news',
      formData: formData,
      mediaType: 'multipart/form-data',
    });
  }
  /**
   * @param id
   * @returns NewDto Actualité trouvée
   * @throws ApiError
   */
  public static findOne(
    id: string,
  ): CancelablePromise<NewDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/news/{id}',
      path: {
        'id': id,
      },
      errors: {
        404: `Actualité non trouvée`,
      },
    });
  }
}
