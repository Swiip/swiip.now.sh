import html from "/html.js";
import style from "/style.js";

import { cascading, bounceInRight } from "/components/animations.js";

const Container = style("article")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});

const Line = style("h2")(
  cascading(
    {
      fontSize: "35px",
      fontWeight: "normal",
      margin: "10px 0",
      opacity: "0",
      animation: `${bounceInRight} .3s forwards`
    },
    3
  )
);

const Home = () => html`
  <${Container}>
    <${Line}>Web Developer.<//>
    <${Line}>Trainer.<//>
    <${Line}>Speaker.<//>
  <//>
`;

export default Home;
