import html from "/html.js";
import style from "/style.js";
import { useState } from "/imports/preact/hooks.js";

const Main = style("main")({
  height: "100%",
  flex: "1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
});

const Loading = () =>
  html`
    Loading...
  `;

const MainComponent = ({ content }) => {
  const [cache, setCache] = useState({});

  let Component = Loading;

  if (!cache[content]) {
    const load = async () => {
      const module = await import(`/components/${content}.js`);
      setCache({ ...cache, [content]: module.default });
    };
    setCache({ ...cache, [content]: load() });
  } else if (!cache[content].then) {
    Component = cache[content];
  }

  return html`
    <${Main}>
      <${Component} />
    <//>
  `;
};

export default MainComponent;
