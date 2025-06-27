export const SetType = {
  STANDARD: 'StandardCollection',
  CURATED: 'CuratedSet',
  REF: 'SetRef',
  TRENDING: 'TrendingSet',
  PERSONALIZED: 'PersonalizedCuratedSet',
} as const;

export type SetType = (typeof SetType)[keyof typeof SetType];
