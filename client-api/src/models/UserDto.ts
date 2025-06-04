/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserDto = {
  /**
   * Identifiant unique de l’utilisateur
   */
  userId: number;
  /**
   * Prénom
   */
  firstName: string;
  /**
   * Nom de famille
   */
  lastName: string;
  /**
   * Adresse email
   */
  email?: string;
  /**
   * Téléphone
   */
  phone?: string;
  /**
   * Ville
   */
  city?: string;
  /**
   * Profession
   */
  profession?: string;
  /**
   * Date de naissance
   */
  birthdate?: string;
  /**
   * Photo de profil (URL)
   */
  photo?: string;
  /**
   * L’utilisateur est-il actif ?
   */
  isActive: boolean;
  /**
   * Rôles attribués
   */
  roles: Array<'user' | 'admin'>;
};

