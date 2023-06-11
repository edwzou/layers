import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 1234;

app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.user(express.urlencoded({
    extended: true
}));

const corsOptions = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));