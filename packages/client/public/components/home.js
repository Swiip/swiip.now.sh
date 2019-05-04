import html from "/html.js";
import style from "/style.js";

const Container = style("article")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});

const Line = style("h2")({
  fontSize: "35px",
  fontWeight: "normal",
  margin: "10px 0"
});

const Home = () => html`
  <${Container}>
    <${Line}>Web Developer.<//>
    <${Line}>Trainer.<//>
    <${Line}>Speaker.<//>
  <//>
`;

export default Home;
