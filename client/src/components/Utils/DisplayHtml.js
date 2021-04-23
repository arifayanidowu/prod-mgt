import { useState, useEffect } from "react";
import {
  ContentState,
  convertFromHTML,
  convertFromRaw,
  EditorState,
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";

const DisplayHtml = ({ data }) => {
  const [html, setHtml] = useState(null);

  useEffect(() => {
    const markup = stateToHTML(convertFromRaw(JSON.parse(data)));

    const blocksFromHTML = convertFromHTML(markup);
    const newState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setHtml(EditorState.createWithContent(newState));
  }, [data]);

  return <>{html}</>;
};

export default DisplayHtml;
