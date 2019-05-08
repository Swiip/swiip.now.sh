import { useEffect, useState } from "preact/hooks";
import html from "../html";
import style from "../style";

const Background = style("div")(({ mousePosition = { x: 0, y: 0 } }) => ({
  height: "100%",
  width: "100%",
  color: "white",
  background: `radial-gradient(circle at ${mousePosition.x}px ${
    mousePosition.y
  }px, rgb(44, 47, 72), rgb(11, 15, 28) 70%)`,
  padding: "20px 50px;",
  display: "flex",
  flexDirection: "column"
}));

const BackgroundDynamic = ({ children }) => {
  const [mousePosition, setMousePosition] = useState();

  useEffect(() => {
    window.addEventListener("mousemove", setMousePosition);
    return () => window.removeEventListener("mousemove", setMousePosition);
  });

  return html`
    <${Background} mousePosition=${mousePosition}>${children}</${Background}>
  `;
};

export default BackgroundDynamic;
