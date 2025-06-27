import type { HomeJsonResponse } from '../types/api/homeJson';
import type { ContentCollection, ContentItem, ShelfContainer, ShelfContainerSet } from '../types/data/collection';
import type { Dictionary } from '../types/data/global';

export type NormalizedData = {
  shelfOrder: string[];
  shelves: Dictionary<{
    id: string;
    title: string;
    contentIds: string[];
    type: 'set' | 'ref';
    refId?: string;
    isLoaded?: boolean;
  }>;
  content: Dictionary<{
    id: string;
    title: string;
    imageUrl?: string;
    type: string;
    [key: string]: any;
  }>;
};

export const normalizeHomeJson = (data: HomeJsonResponse): NormalizedData => {
  const shelfOrder: string[] = [];
  const shelves: NormalizedData['shelves'] = {};
  const content: NormalizedData['content'] = {};
  const containers: ShelfContainer[] = data.StandardCollection.containers;

  for (const container of containers) {
    const set: ShelfContainerSet = container.set;
    const { setId = '', refId = '' } = set;
    const title = set.text?.title?.full?.set?.default?.content || 'Untitled Shelf';

    const contentIds: string[] = [];

    for (const item of set?.items ?? []) {
      const collectionId = (item as ContentCollection).collectionId ?? '';
      const contentId = (item as ContentItem)?.contentId ?? '';

      if (collectionId) contentIds.push(collectionId);
      if (contentId) contentIds.push(contentId);

      // Only add if we haven't already (avoids duplicate ContentItems across shelves)
      if (contentId && !content[contentId]) {
        content[contentId] = normalizeContentItem(item as ContentItem);
      }
      if (collectionId && !content[collectionId]) {
        content[collectionId] = normalizeContentCollection(item as ContentCollection) as any;
      }
    }

    if (setId) {
      shelves[setId] = {
        id: setId,
        title,
        contentIds,
        type: 'set',
      };
      shelfOrder.push(setId);
    } else if (refId) {
      shelves[refId] = {
        id: refId,
        title,
        refId,
        type: 'ref',
        contentIds: [],
        isLoaded: false,
      };
      shelfOrder.push(refId);
    }
  }

  return {
    shelfOrder,
    shelves,
    content,
  };
};

/**
 *
 * @param item
 * @returns
 */
// const getContentTitle = (item: ContentItem): string => item.text?.title?.full?.series?.default?.content || 'Untitled Item';
const getContentTitle = (item: ContentItem, contentType: string): string => {
  const resource = item.text?.title?.full;
  return (resource as any)?.[contentType]?.default?.content ?? '';
};

/**
 *
 * @param item
 * @returns string
 */
// const getContentImgSrc = (item: ContentItem): string => item.image?.tile?.['1.78']?.series?.default?.url || '';
const getContentImgSrc = (item: ContentItem, prop: string): string => {
  const tileImg = getTileImgByAspectRatio(item, '1.78')?.[prop];
  return tileImg?.default?.url ?? '';
};

/**
 * Aspect Ratio from response
 * @param item
 * @param aspectRatio
 * @returns
 */
const getTileImgByAspectRatio = (item: ContentItem, aspectRatio: string) => item.image?.tile?.[aspectRatio] ?? {};

/**
 * Normalize collection data
 * @param item
 * @returns
 */
const normalizeContentCollection = (collection: ContentCollection) => {
  const { collectionId = '' } = collection;
  // const title = getContentTitle(item as any, 'collection');
  return {
    ...collection, // probably don't need all the details
    id: collectionId,
    title: getContentTitle(collection as any, 'collection'),
    imageUrl: getContentImgSrc(collection as any, 'default'),
  };
};

export const normalizeContentItem = (item: ContentItem) => {
  const { contentId = '' } = item;
  // TODO: Optimize this logic
  const title = getContentTitle(item as ContentItem, 'series') || getContentTitle(item as ContentItem, 'program');
  return {
    ...item, // probably don't need all the details
    id: contentId,
    title: title || 'Unknown',
    imageUrl: getContentImgSrc(item as ContentItem, 'series') || getContentImgSrc(item as ContentItem, 'program'),
    type: (item as ContentItem)?.type,
  };
};

export const normalizeSetJson = (set: ShelfContainerSet) => {
  const shelf = {
    id: set!.setId,
    refId: set.setId,
    title: set.text?.title?.full?.set?.default?.content ?? 'Untitled',
    contentIds: set.items?.map((item: any) => item.contentId) ?? [],
    isLoaded: true,
  };

  const content =
    set.items?.reduce((acc: any, item: any) => {
      acc[item.contentId] = normalizeContentItem(item);
      return acc;
    }, {}) ?? {};

  return { shelf, content };
};
