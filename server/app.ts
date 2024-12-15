import http from 'node:http';
import {PORT} from '@/const';
import {requestHandler} from '@/routes';

const server = http.createServer((req, res) => requestHandler(req, res));

server.listen(3000, () => console.log(`Server running on http://localhost:${PORT}`));
