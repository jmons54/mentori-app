/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RegisterDto = {
  /**
   * Prénom de l’utilisateur
   */
  firstName: string;
  /**
   * Nom de l’utilisateur
   */
  lastName: string;
  /**
   * Date de naissance au format ISO
   */
  birthdate?: string;
  /**
   * Email (requis si téléphone absent)
   */
  email?: string;
  /**
   * Numéro de téléphone (requis si email absent)
   */
  phone?: string;
  /**
   * Ville de résidence
   */
  city?: string;
  /**
   * Profession
   */
  profession?: string;
  /**
   * Mot de passe sécurisé
   */
  password: string;
};

