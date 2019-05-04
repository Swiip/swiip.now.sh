import { render } from "/imports/preact.js";
import html from "/html.js";
import Background from "/components/background.js";

const Other = ({ coucou }) => html`
  <div>${coucou.foo}</div>
`;

const App = () => html`
  <div>HelloWorld</div>
  <${Other} coucou=${{ foo: "COUCOU" }}><//>
`;

render(
  html`
    <${Background}><${App} /><//>
  `,
  document.body
);
