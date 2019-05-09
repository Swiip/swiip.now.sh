import { useState, useEffect } from "preact/hooks";

import html from "../html";
import style from "../style";

import Home from "./home";
import Content from "./content";

const Main = style("main")({
  height: "100%",
  flex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});

const Powered = style("a")({
  margin: "10px"
});

const MainComponent = ({ content }) => {
  const [type, setType] = useState("home");
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (content !== type) {
      setExiting(true);
      setTimeout(() => {
        setType(content);
        setExiting(false);
      }, 500);
    }
  }, [content]);

  return html`
    <${Main}>
      ${type === "home"
        ? html`
            <${Home} exiting=${exiting} />
          `
        : html`
            <${Content} type=${type} exiting=${exiting} />
          `}
      ${type === "medium" &&
        html`
          <${Powered} href="https://medium.com/@Swiip_51904" target="_blank">
            Powered by Medium (@Swiip_51904)
          <//>
        `}
    <//>
  `;
};

export default MainComponent;
