// Do not change anything till line no. 7, because
// it loads the .env file into the process.env object
import dotenv from 'dotenv';
import path from 'path';
import Module from "node:module"
const nodeRequire = Module.createRequire(import.meta.url)
globalThis.require = nodeRequire;
const { NEUTRINOS_APP_ENV: env = 'dev' } = process.env;
const envFilePath = path.join(process.cwd(), 'environments', `${env}.env`);
dotenv.config({ path: envFilePath });

