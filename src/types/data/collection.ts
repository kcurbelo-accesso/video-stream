import type { Dictionary } from './global';

export type TitleText = { content: string; language: string; sourceEntity: string };

export type Slug = {
  language: string;
  value: string;
};

export type CollectionGroup = {
  collectionGroupId: string;
  contentClass: string;
  key: string;
  slugs: Slug[];
};

export type ContentItem = {
  callToAction?: Dictionary | null;
  contentId?: string;
  currentAvailability: { region: string; kidMode: boolean };
  encodedSeriesId: string;
  image: Dictionary;
  mediaRights: Dictionary;
  ratings: Dictionary[];
  releases: Dictionary[];
  tags: Dictionary[];
  seriesId: string;
  text: {
    title: {
      full: {
        series?: { default: TitleText };
        program?: { default: TitleText };
        collection?: { default: TitleText };
      };
    };
  };
  textExperienceId: string;
  type: string;
  videoArt: Dictionary[];
};

export type ContentCollection = {
  callToAction?: Dictionary | null;
  collectionId?: string;
  collectionGroup: CollectionGroup;
  contentClass: string;
  key: string;
  slugs: Slug[];
};

export type ShelfContainerSetText = {
  title: { full: { set: { default: TitleText } } };
};

export type ShelfContainerSet = {
  contentClass: string;
  items?: Array<ContentItem | ContentCollection>;
  meta: Dictionary;
  setId?: string;
  refId?: string;
  experimentToken?: string;
  text: ShelfContainerSetText;
  type: string;
};

export type ShelfContainer = {
  set: ShelfContainerSet;
  style: string;
  type: string;
};

export type StandardCollection = {
  type: string;
  collectionGroup: CollectionGroup;
  collectionId: string;
  videoArt: Dictionary[];
  containers: ShelfContainer[];
  image?: Dictionary;
  text?: Dictionary;
  callToAction?: Dictionary | null;
};
