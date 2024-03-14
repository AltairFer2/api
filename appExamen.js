const express = require('express');

const collectionRoutes = require('./routes/collectionsRoutes')

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', collectionRoutes)


app.listen(port, async () => {
    console.log(`Example app listening on port ${port}!`);
});