/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateMessageDto } from '../models/CreateMessageDto';
import type { MessageDto } from '../models/MessageDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MessagesService {
  /**
   * @param requestBody
   * @returns MessageDto
   * @throws ApiError
   */
  public static sendMessage(
    requestBody: CreateMessageDto,
  ): CancelablePromise<MessageDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/messages',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param userId
   * @returns MessageDto
   * @throws ApiError
   */
  public static getConversation(
    userId: string,
  ): CancelablePromise<Array<MessageDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/messages/conversation/{userId}',
      path: {
        'userId': userId,
      },
    });
  }
  /**
   * @returns MessageDto
   * @throws ApiError
   */
  public static inbox(): CancelablePromise<Array<MessageDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/messages/inbox',
    });
  }
  /**
   * Liste des conversations actives par utilisateur
   * @returns MessageDto
   * @throws ApiError
   */
  public static getConversations(): CancelablePromise<Array<MessageDto>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/messages/conversations',
    });
  }
}
