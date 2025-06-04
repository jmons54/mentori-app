/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ExerciseDetailDto } from '../models/ExerciseDetailDto';
import type { PaginatedDocumented } from '../models/PaginatedDocumented';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ExerciseService {
  /**
   * @param page Page number to retrieve.If you provide invalid value the default page number will applied
   * <p>
   * <b>Example: </b> 1
   * </p>
   * <p>
   * <b>Default Value: </b> 1
   * </p>
   *
   * @param limit Number of records per page.
   * <p>
   * <b>Example: </b> 20
   * </p>
   * <p>
   * <b>Default Value: </b> 20
   * </p>
   * <p>
   * <b>Max Value: </b> 100
   * </p>
   *
   * If provided value is greater than max value, max value will be applied.
   *
   * @param filterCategoryId Filter by category.id query param.
   * <p>
   * <b>Format: </b> filter.category.id={$not}:OPERATION:VALUE
   * </p>
   * <p>
   * <b>Example: </b> filter.category.id=$not:$like:John Doe&filter.category.id=like:John
   * </p>
   * <h4>Available Operations</h4><ul><li>$eq</li></ul>
   * @param filterName Filter by name query param.
   * <p>
   * <b>Format: </b> filter.name={$not}:OPERATION:VALUE
   * </p>
   * <p>
   * <b>Example: </b> filter.name=$not:$like:John Doe&filter.name=like:John
   * </p>
   * <h4>Available Operations</h4><ul><li>$and</li>
   * <li>$or</li>
   * <li>$not</li>
   * <li>$eq</li>
   * <li>$gt</li>
   * <li>$gte</li>
   * <li>$in</li>
   * <li>$null</li>
   * <li>$lt</li>
   * <li>$lte</li>
   * <li>$btw</li>
   * <li>$ilike</li>
   * <li>$sw</li>
   * <li>$contains</li></ul>
   * @param filterActive Filter by active query param.
   * <p>
   * <b>Format: </b> filter.active={$not}:OPERATION:VALUE
   * </p>
   * <p>
   * <b>Example: </b> filter.active=$not:$like:John Doe&filter.active=like:John
   * </p>
   * <h4>Available Operations</h4><ul><li>$and</li>
   * <li>$or</li>
   * <li>$not</li>
   * <li>$eq</li>
   * <li>$gt</li>
   * <li>$gte</li>
   * <li>$in</li>
   * <li>$null</li>
   * <li>$lt</li>
   * <li>$lte</li>
   * <li>$btw</li>
   * <li>$ilike</li>
   * <li>$sw</li>
   * <li>$contains</li></ul>
   * @param sortBy Parameter to sort by.
   * <p>To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting</p>
   * <p>
   * <b>Format: </b> fieldName:DIRECTION
   * </p>
   * <p>
   * <b>Example: </b> sortBy=id:DESC&sortBy=createdAt:ASC
   * </p>
   * <p>
   * <b>Default Value: </b> id:ASC
   * </p>
   * <h4>Available Fields</h4><ul><li>id</li>
   * <li>type</li>
   * <li>difficulty</li>
   * <li>category.name</li></ul>
   *
   * @param select List of fields to select.
   * <p>
   * <b>Example: </b> id,type,difficulty,category.name,isActive
   * </p>
   * <p>
   * <b>Default Value: </b> By default all fields returns. If you want to select only some fields, provide them in query param
   * </p>
   *
   * @returns any
   * @throws ApiError
   */
  public static findAll(
    page?: number,
    limit?: number,
    filterCategoryId?: Array<string>,
    filterName?: Array<string>,
    filterActive?: Array<string>,
    sortBy?: Array<'id:ASC' | 'id:DESC' | 'type:ASC' | 'type:DESC' | 'difficulty:ASC' | 'difficulty:DESC' | 'category.name:ASC' | 'category.name:DESC'>,
    select?: string,
  ): CancelablePromise<PaginatedDocumented> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/exercise',
      query: {
        'page': page,
        'limit': limit,
        'filter.category.id': filterCategoryId,
        'filter.name': filterName,
        'filter.active': filterActive,
        'sortBy': sortBy,
        'select': select,
      },
    });
  }
  /**
   * @param id
   * @returns ExerciseDetailDto
   * @throws ApiError
   */
  public static findOne(
    id: number,
  ): CancelablePromise<ExerciseDetailDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/exercise/{id}',
      path: {
        'id': id,
      },
    });
  }
  /**
   * @returns any
   * @throws ApiError
   */
  public static uploadPhoto(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/exercise/image',
    });
  }
}
