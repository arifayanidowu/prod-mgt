import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

export const textToHtml = (text) => {
  if (text) {
    return stateToHTML(convertFromRaw(JSON.parse(text)));
  }
};
