import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faStar,
  faPencil,
  faNewspaper,
  faLinkSlash,
  faLink,
  faRobot,
  faUser,
  faSearch,
  faTimeline,
  faLayerGroup,
  faLightbulb,
  faFish,
} from '@fortawesome/free-solid-svg-icons';

export const iconThemeTypeMap: { [key: string]: IconProp } = {
  top: faStar,
  custom: faPencil,
  article: faNewspaper,
  search_term: faSearch,
  tab_thread: faTimeline,
  recurrent: faLayerGroup,
  sporadic: faFish,
  proposition: faLightbulb,
};

export const iconRelTypeMap: { [key: string]: IconProp } = {
  related: faNewspaper,
  recurrent: faLink,
  sporadic: faLinkSlash,
};

export const iconChatTypeMap: { [key: string]: IconProp } = {
  user: faUser,
  assistant: faRobot,
  system: faRobot,
};
