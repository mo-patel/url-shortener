import express from 'express';
import { getLink, saveLink } from './service';

const app = express();

app.get('/r/:id', async (req, res) => {
    let id = req.params.id;
    if(!id)
        res.status(400).send({"message": "Link identifier is missing"});
    let link = await getLink(id);
    if(!link)
        return res.status(404).send({"message": "Link cannot be found"});
    return res.redirect(link);
});

app.get('/shorten', async (req, res) => {
    const link = req.query.link;
    if(!link)
        return res.status(400).send({"message": "Link url is missing. Please try again"});
    const newID = await saveLink(link)
    if(!newID)
        return res.status(500).send({"message": "An error occurred"});
    return res.send({"message": "Your shortened URL has been successfully generated. To access, visit: " + req.header('host') + '/r/' + newID})
});

app.listen(4000, () => {
  console.log(`server running on port 4000`);
});