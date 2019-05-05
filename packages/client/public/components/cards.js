import html from "/html.js";
import style from "/style.js";
import { useState, useRef } from "/imports/preact/hooks.js";

import { cascading, bounceInRight, spin } from "/components/animations.js";

const CardsContainer = style("article")({
  display: "flex",
  flexDirection: "row",
  height: "100%",
  overflow: "hidden"
});

const CardsScroll = style("div")({
  display: "flex",
  flexDirection: "row",
  height: "100%",
  overflow: "hidden"
});

const Arrow = style("button")(({ show }) => ({
  flex: "0 0 80px",
  fontSize: "50px",
  transition: "opacity .3s",
  opacity: show ? "1" : "0",
  ":hover": {
    animation: `${spin} 1s`
  }
}));

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
  const scrollRef = useRef();
  const [showArrows, setShowArrows] = useState([false, true]);

  const scroll = direction => () => {
    scrollRef.current.base.scrollBy({
      left: direction * 400,
      behavior: "smooth"
    });
    setTimeout(() => {
      const element = scrollRef.current.base;
      const scrollValue = element.scrollLeft;
      const maxScrollLeft = element.scrollWidth - element.clientWidth;
      setShowArrows([scrollValue > 0, scrollValue < maxScrollLeft]);
    }, 500);
  };

  return html`
    <${CardsContainer}>
      <${Arrow} onClick=${scroll(-1)} show=${showArrows[0]}>
        ${"<"}
      <//>
      <${CardsScroll} ref=${scrollRef}>
        ${children}
      <//>
      <${Arrow} onClick=${scroll(1)} show=${showArrows[1]}>
        ${">"}
      <//>
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
