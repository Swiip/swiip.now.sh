import html from "/html.js";
import style from "/style.js";

import { cascading, bounceInRight } from "/components/animations.js";

const CardsContainer = style("article")({
  display: "flex",
  flexDirection: "row"
});

const CardContainer = style("section")(
  cascading(
    {
      display: "flex",
      flexDirection: "column",
      opacity: "0",
      animation: `${bounceInRight} .3s forwards`
    },
    0
  )
);

export const Cards = ({ children }) => html`
  <${CardsContainer}>
    ${children}
  <//>
`;

export const Card = ({ title }) => html`
  <${CardContainer}>
    <h3>${title}</h3>
  <//>
`;
