export const SetType = {
  CURATED: 'CuratedSet',
  REF: 'SetRef',
} as const;

export type SetType = (typeof SetType)[keyof typeof SetType];
