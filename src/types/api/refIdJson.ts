import type { ShelfContainerSet } from '../data/collection';
import type { SetType } from '../enums';

export type RefIdJsonResponse = {
  [key in SetType]: ShelfContainerSet;
};
