import fs from 'fs';
import path from 'path';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const socketAddress = process.env['WS_SOCKET_URL'] ? JSON.stringify('wss://' + process.env['WS_SOCKET_URL']).replace(/"/g,"'") : "'ws://127.0.0.1:8888'";
const fullTextContent = `export const WS_SOCKET_URL = ${socketAddress};`;

fs.appendFileSync(path.resolve(__dirname, '../src/environments/environment.prod.ts'), JSON.stringify(fullTextContent).replace(/"/g,"") );



