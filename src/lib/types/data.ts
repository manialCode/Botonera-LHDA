export interface video {
  id: Number;
  title: string;
  link: string;
  thumbnail: string;
  views: Number;
}

export enum SortBy {
  NONE = "none",
  TITLE = "title",
  VIEW = "views",
  LINK = "link",
}
