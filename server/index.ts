import * as http from 'http';
import app from './app';
const httpServer = http.createServer(app);

httpServer.listen(4000, () => console.log('Example app listening on port 4000!'));

