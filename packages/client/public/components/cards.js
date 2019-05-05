import html from "/html.js";
import style from "/style.js";
import { useState } from "/imports/preact/hooks.js";

import { cascading, bounceInRight } from "/components/animations.js";

const CardsContainer = style("article")({
  display: "flex",
  flexDirection: "row",
  height: "100%",
  overflow: "hidden"
});

const CardContainer = style("section")(
  cascading(
    {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      opacity: "0",
      animation: `${bounceInRight} .3s forwards`,
      height: "100%",
      flex: "0 0 300px"
    },
    0
  )
);

const ImageContainer = style("div")({
  padding: "20px",
  width: "300px",
  height: "200px"
});

const ImageBox = style("div")({
  width: "100%",
  height: "100%",
  overflow: "hidden"
});

const Image = style("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform .3s"
});

const Break = style("hr")({
  width: "95%",
  opacity: ".3",
  transition: "opacity .3s"
});

const Title = style("h3")({
  padding: "20px",
  margin: "0",
  height: "100px",
  fontWeight: "normal",
  textAlign: "center",
  transition: "transform .3s"
});

const Description = style("p")({
  padding: "20px",
  margin: "0",
  height: "100px",
  fontSize: "16px",
  opacity: "0.5"
});

const ClickZone = style("a")({
  margin: "0",
  ":hover img": {
    transform: "scale(1.2)"
  },
  ":hover hr": {
    opacity: "1"
  },
  ":hover h3": {
    transform: "scale(1.2)"
  }
});

export const Cards = ({ children }) => {
  const [started, setStarted] = useState(false);
  const [realStarted, setRealStarted] = useState(false);
  const [previous, setPrevious] = useState(null);

  const onMouseDown = event => {
    setStarted(true);
    setPrevious(event);
  };

  const onMouseMove = event => {
    if (started) {
      const container = event.target.closest("article");
      const move = previous.x - event.x;
      if (realStarted || Math.abs(move) > 2) {
        container.scrollLeft += move;
        setPrevious(event);
        setRealStarted(true);
      }
    }
  };

  const onClick = event => {
    if (realStarted) {
      event.preventDefault();
    }
    setStarted(false);
    setRealStarted(false);
  };

  return html`
    <${CardsContainer}
      onMouseDown=${onMouseDown}
      onMouseMove=${onMouseMove}
      onClick=${onClick}
      onMouseOut=${onClick}
    >
      ${children}
    <//>
  `;
};

export const Card = ({ title, image, link, description }) => html`
  <${CardContainer}>
    <${ClickZone} href=${link} target="_blank" draggable=${false}>
      <${ImageContainer}>
        <${ImageBox}>
          <${Image} src=${image} alt=${title} draggable=${false} />
        <//>
      <//>
      <${Break} />
      <${Title} draggable=${false}>${title}<//>
      <${Description} draggable=${false}>${description}<//>
    <//>
  <//>
`;
