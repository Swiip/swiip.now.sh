import html from "/html.js";
import style, { keyframes } from "/style.js";

const Container = style("article")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
});

const bounceInRight = keyframes({
  from: {
    opacity: "0",
    transform: "translate3d(300px, 0, 0)"
  },

  "75%": {
    opacity: "1",
    transform: "translate3d(-10px, 0, 0)"
  },

  to: {
    opacity: "1",
    transform: "translate3d(0, 0, 0)"
  }
});

const Line = style("h2")({
  fontSize: "35px",
  fontWeight: "normal",
  margin: "10px 0",
  opacity: "0",
  animation: `${bounceInRight} .3s forwards`,
  animationDelay: ".3s",
  ":nth-child(2)": {
    animationDelay: ".4s"
  },
  ":nth-child(3)": {
    animationDelay: ".5s"
  }
});

const Home = () => html`
  <${Container}>
    <${Line}>Web Developer.<//>
    <${Line}>Trainer.<//>
    <${Line}>Speaker.<//>
  <//>
`;

export default Home;
