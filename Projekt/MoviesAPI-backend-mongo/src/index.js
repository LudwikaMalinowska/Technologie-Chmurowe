const express = require('express');
const app = express();
const cors = require('cors');

const movies = require('./routes/movies');
const persons = require('./routes/persons');
const actors = require('./routes/actors');

app.use(express.json());
app.use(cors());
app.use("/api/movies", movies);
app.use("/api/persons", persons);
app.use("/api/actors", actors);
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


