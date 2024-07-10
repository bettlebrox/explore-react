import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faStar, faPencil, faNewspaper, faLinkSlash, faLink, faRobot, faUser } from "@fortawesome/free-solid-svg-icons";

export const iconThemeTypeMap: { [key: string]: IconProp } = {
    top: faStar,
    custom: faPencil,
    article: faNewspaper,
  };

export const iconRelTypeMap:{ [key: string]: IconProp} = {
  related: faNewspaper,
  recurrent: faLink,
  sporadic: faLinkSlash
}

export const iconChatTypeMap:{ [key: string]: IconProp} = {
  user: faUser,
  assistant: faRobot,
  system: faRobot,
  undefined: faRobot
}