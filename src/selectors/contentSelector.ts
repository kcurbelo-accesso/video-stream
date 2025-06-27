import type { NormalizedData } from '../utils/api.utils';

/**
 * Get content items inside shelf
 * @param state
 * @param shelfId
 * @returns
 */
export const selectShelfItemIds = (state: NormalizedData, shelfId: string): string[] => {
  return state.shelves[shelfId]?.contentIds ?? [];
};

/**
 * Get Shelf info from state
 * @param state
 * @param shelfId
 * @returns
 */
export const selectShelfbyId = (state: NormalizedData, shelfId: string) => {
  return state.shelves[shelfId] ?? {};
};

/**
 * Get Content from state by id
 * @param state
 * @param id
 * @returns
 */
export const selectContentById = (state: NormalizedData, id: string) => {
  return state.content[id];
};
