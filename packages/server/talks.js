import { stringify } from "querystring";
import fetch from "node-fetch";
import express from "express";

const app = express();

const spaceId = "yiag7v31k8be";
const url = `https://cdn.contentful.com/spaces/${spaceId}/entries`;
const token = process.env.CONTENTFUL_API_TOKEN;

app.get("*", async (req, res) => {
  const queryString = stringify({
    access_token: token,
    content_type: "talk"
  });
  const request = await fetch(`${url}?${queryString}`);
  const data = await request.json();

  const getImage = imageId =>
    data.includes.Asset.find(asset => asset.sys.id === imageId);

  const mapped = data.items.map(item => {
    const date = new Date(item.fields.date);
    return {
      title: `${item.fields.conference}, ${item.fields.talk}`,
      image: getImage(item.fields.image.sys.id).fields.file.url,
      date,
      link: item.fields.link,
      description: `${date.toDateString()}, ${item.fields.location}`
    };
  });

  const sorted = mapped.sort((a, b) => b.date.getTime() - a.date.getTime());

  res.send(sorted);
});

export default app;
