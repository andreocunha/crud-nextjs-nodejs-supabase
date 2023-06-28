import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getLocalIpAddresses } from './utils/network';
import tableRoutes from './routes/table';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', [tableRoutes]);

const server = http.createServer(app);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  const ipAddress = getLocalIpAddresses()
  console.log(`Server running at http://${ipAddress}:${port}`);
});
