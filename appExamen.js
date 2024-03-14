const express = require('express');
const cors = require('cors');

const collectionRoutes = require('./routes/collectionsRoutes');

const app = express();
const port = 3000;

// Habilitar CORS para todas las solicitudes
app.use(cors());

app.use(express.json());
app.use('/', collectionRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
