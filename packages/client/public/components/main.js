import html from "/html.js";
import style from "/style.js";
import { useState, useEffect } from "/imports/preact/hooks.js";
import Home from "/components/home.js";
import Content from "/components/content.js";

const Main = style("main")({
  height: "100%",
  flex: "1",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
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
          <a href="https://medium.com/@Swiip_51904" target="_blank">
            Powered by Medium (@Swiip_51904)
          </a>
        `}
    <//>
  `;
};

export default MainComponent;
