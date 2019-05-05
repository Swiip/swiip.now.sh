/* eslint-disable no-param-reassign */

import { keyframes } from "/style.js";

const cascadingDepth = 5;

export const cascading = (style, offset) => {
  style.animationDelay = `.${offset + cascadingDepth}s`;
  [...Array(cascadingDepth)].forEach((_, i) => {
    style[`:nth-child(${i + 1})`] = {
      animationDelay: `.${offset + i}s`
    };
  });
  return style;
};

export const bounceInRight = keyframes({
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
