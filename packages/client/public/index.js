import { render } from "/imports/preact.js";
import html from "/html.js";

import Background from "/components/background.js";
import Header from "/components/header.js";
import Main from "/components/main.js";
import Footer from "/components/footer.js";

render(
  html`
    <${Background}>
      <${Header} />
      <${Main} />
      <${Footer} />
    <//>
  `,
  document.body
);
