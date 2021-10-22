import { serveHttp } from "./app";

serveHttp.listen(4000, () => {
    console.log('🚀 Server is running!');
})