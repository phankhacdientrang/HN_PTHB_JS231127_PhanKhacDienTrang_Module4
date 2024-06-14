import express from 'express';
import router from '../src/router/Router';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
