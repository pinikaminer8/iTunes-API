import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
        res.render("index.ejs", {results: []});
});

app.post("/search", async (req, res) => {
    try {
        const term = req.body.term;
        const country = 'IL';
        const media = req.body.media;
        const  params = {
            term: term,
            country: country,
            media: media
        }
        const response = await axios.get('https://itunes.apple.com/search', {params})
        const results = response.data.results;
        res.render("index.ejs", {results: results, term: term});
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", { error: error.message});
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})