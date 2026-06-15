import "dotenv/config";
import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send("Hello Blog API");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        send(err);
    }

    console.log(`Server running on PORT ${PORT}`);
});