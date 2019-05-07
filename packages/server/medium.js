import { promisify } from "util";
import fetch from "node-fetch";
import { parseString } from "xml2js";
import express from "express";
import cheerio from "cheerio";

const parseXml = promisify(parseString);

const mediumRssUrl = "https://medium.com/feed/@Swiip_51904";

const app = express();

const getImage = content => {
  const $ = cheerio.load(content);
  return $("img").attr("src");
};

app.get("*", async (req, res) => {
  const rssResquest = await fetch(mediumRssUrl);
  const rssContent = await rssResquest.text();
  const rssParsed = await parseXml(rssContent);
  const rssItems = rssParsed.rss.channel[0].item;
  const itemsPromises = rssItems.map(async rssItem => ({
    title: rssItem.title[0],
    link: rssItem.link[0],
    description: rssItem.category.join(", "),
    date: rssItem.pubDate[0],
    image: getImage(rssItem["content:encoded"][0])
  }));
  const items = await Promise.all(itemsPromises);
  res.send(items);
});

export default app;
