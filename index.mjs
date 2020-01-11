import express from "express";
import cors from "cors";
import path from "path";
let __dirname = path.dirname(process.argv[1]);
import Enqueue from "express-enqueue";
import WebSocket from "ws";
import cookieParser from "cookie-parser";
import http from "http";
import bodyParser from "body-parser";
const app = express();
app.use(cookieParser())
app.use(cors())
app.disable('x-powered-by');
app.use(bodyParser.json())

const queue = new Enqueue({
    concurrentWorkers: 4,
    maxSize: 200,
    timeout: 30000
});
app.use(queue.getMiddleware());

let whitelist = ['https://web3-monopoly.web.app','http://localhost:8886','http://localhost:8887','http://localhost:8888','http://localhost:8889','https://xart-3e938.firebaseapp.com','https://xart-3e938.web.app','https://universitykids.ru','https://vashi-faili.web.app','https://vashi-faili.web.app',  'https://www.universitykids.ru', 'https://tuning-fork.firebaseapp.com','http://localhost:8888', 'https://jainagul-tezekbaeva.firebaseapp.com','https://tezekbaeva.firebaseapp.com']
const account = `/3N8n4Lc8BMsPPyVHJXTivQWs7ER61bB7wQn`
app.use(cors({
    credentials: true,
    origin: true
}));
let corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors({
    origin: 'http://localhost:8888'
}));

app.options('/*', cors(corsOptions))
app.get('/*', async (req, res) => {
    console.log('~~~~~~/*~~~~~~~', req.cookies.webRTC)
    res.sendFile('/index.html', { root: __dirname });
})
app.use( express.static('public'));
app.use(queue.getErrorMiddleware())

app.listen(process.env.PORT || 7005, () => { console.info(`Server running on port: 7005`) });