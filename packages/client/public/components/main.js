import html from "/html.js";
import style from "/style.js";

const Main = style("main")({
  height: "100%"
});

const MainComponent = () => html`
  <${Main}>
    hell world
  <//>
`;

export default MainComponent;
