import { render } from "/imports/preact.js";
import html from "/html.js";
import { useState } from "/imports/preact/hooks.js";

import Background from "/components/background.js";
import Header from "/components/header.js";
import Main from "/components/main.js";

const App = () => {
  const [content, setContent] = useState("home");

  return html`
    <${Background}>
      <${Header} setContent=${setContent} />
      <${Main} content=${content} />
    <//>
  `;
};

render(
  html`
    <${App} />
  `,
  document.body
);
