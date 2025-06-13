/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateMessageDto } from '../models/CreateMessageDto';
import type { MessageEntity } from '../models/MessageEntity';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MessagesService {
  /**
   * Envoyer un message
   * @param requestBody
   * @returns MessageEntity
   * @throws ApiError
   */
  public static sendMessage(
    requestBody: CreateMessageDto,
  ): CancelablePromise<MessageEntity> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/messages',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * Récupérer la conversation avec un utilisateur
   * @param userId
   * @returns MessageEntity
   * @throws ApiError
   */
  public static getConversation(
    userId: string,
  ): CancelablePromise<Array<MessageEntity>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/messages/conversation/{userId}',
      path: {
        'userId': userId,
      },
    });
  }
  /**
   * Récupérer la boîte de réception de l’utilisateur
   * @returns MessageEntity
   * @throws ApiError
   */
  public static getInbox(): CancelablePromise<Array<MessageEntity>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/messages/inbox',
    });
  }
}
