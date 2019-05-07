import html from "/html.js";
import { useState, useEffect } from "/imports/preact/hooks.js";

import { Cards, Card } from "/components/cards.js";

const Content = ({ type, exiting }) => {
  const [items, setItems] = useState([]);

  useEffect(async () => {
    setItems([]);
    const itemsRequest = await fetch(`/api/${type}`);
    const itemsServer = await itemsRequest.json();
    setItems(itemsServer);
  }, [type]);

  return html`
    <${Cards}>
      ${items.map(
        item =>
          html`
            <${Card}
              title=${item.title}
              image=${item.image}
              link=${item.link}
              description=${item.description}
              exiting=${exiting}
            />
          `
      )}
    <//>
  `;
};

export default Content;
