import type { StandardCollection } from '../data/collection';

export interface HomeJsonResponse {
  StandardCollection: StandardCollection;
  [key: string]: any;
}
