import "dotenv/config";
import express from "express";
import { router } from "./routes";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

const serveHttp = http.createServer(app);
app.use(cors());


const io = new Server(serveHttp,
    {
        cors: {
            origin: "*"
        }
    }
);

io.on("connection", socket => {console.log(`${socket.id} is connected`)});

app.use(express.json());

app.use(router);

app.get("/github", (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
})

app.get("/signin/callback", (request, response) => {
    const { code } = request.query;

    return response.json(code);
})

export { serveHttp, io};