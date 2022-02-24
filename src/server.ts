import express from 'express';
import { getLink, saveLink } from './service';
require('dotenv').config()

const app = express();

app.get('/r/:id', async (req, res) => {
    let id = req.params.id;
    if(!id){
        res.status(400).send({"message": "Link identifier is missing"});
    }
    let link = await getLink(id);
    if(!link){
        return res.status(404).send({"message": "Link cannot be found"});
    }
    return res.redirect(link);
});

app.get('/shorten', async (req, res) => {
    let link = req.query.link as string;
    if(!link){
        return res.status(400).send({"message": "Link url is missing. Please try again"});
    }
    if(!link.includes("http://") && !link.includes("https://")){
        link = "https://" + link;
    }
    //light validation on URLs
    let url;
    try {
      url = new URL(link);
      if(!(url.protocol === "http:" || url.protocol === "https:")){
        throw new Error();
      }
    } catch (e) {
        return res.status(400).send({"message": "Please insert a valid URL"});
    }
    const newID = await saveLink(link)
    if(!newID){
        return res.status(500).send({"message": "An error occurred"});
    }
    return res.send({"message": "Your shortened URL has been successfully generated.", "shortCode": newID})
});

app.listen( process.env.APP_PORT, () => {
  console.log(`server running on port ${process.env.APP_PORT}`);
});