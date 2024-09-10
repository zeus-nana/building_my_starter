export const TypeEtat = {
  EUING: 'euing',
  GRAPHIC_SYSTEM_OM: 'graphic_system_om',
  DIOOL: 'diool',
} as const;

export type TypeEtat = (typeof TypeEtat)[keyof typeof TypeEtat];

export function isValidTypeEtat(etat: string): etat is TypeEtat {
  return Object.values(TypeEtat).includes(etat as TypeEtat);
}
