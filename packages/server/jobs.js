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
    content_type: "job"
  });
  const request = await fetch(`${url}?${queryString}`);
  const data = await request.json();

  const getImage = imageId =>
    data.includes.Asset.find(asset => asset.sys.id === imageId);

  const mapped = data.items.map(item => ({
    title: item.fields.company,
    image: getImage(item.fields.image.sys.id).fields.file.url,
    date: new Date(item.fields.startDate),
    link: item.fields.link,
    description: item.fields.title
  }));

  const sorted = mapped.sort((a, b) => b.date.getTime() - a.date.getTime());

  res.send(sorted);
});

export default app;
