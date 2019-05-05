import html from "/html.js";
import { useState, useEffect } from "/imports/preact/hooks.js";

import { Cards, Card } from "/components/cards.js";

const Blog = () => {
  const [items, setItems] = useState([]);

  useEffect(async () => {
    const itemsRequest = await fetch("/api/medium");
    const itemsServer = await itemsRequest.json();
    setItems(itemsServer);
  }, []);

  if (items.length === 0) {
    return html`
      Loading...
    `;
  }

  return html`
    <${Cards}>
      ${items.map(
        item =>
          html`
            <${Card} title=${item.title} />
          `
      )}
    <//>
  `;
};

export default Blog;
