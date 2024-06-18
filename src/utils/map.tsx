import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faStar, faPencil, faBlog, faNewspaper, faLinkSlash, faLink } from "@fortawesome/free-solid-svg-icons";

export const iconThemeTypeMap: { [key: string]: IconProp } = {
    top: faStar,
    custom: faPencil,
    article: faBlog,
  };

export const iconRelTypeMap:{ [key: string]: IconProp} = {
  related: faNewspaper,
  recurrent: faLink,
  sporadic: faLinkSlash
}