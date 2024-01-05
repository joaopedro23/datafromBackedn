"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbData = exports.sql = void 0;
const postgres_1 = __importDefault(require("postgres"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
PGDATABASE = decodeURIComponent(PGDATABASE || '');
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?option=project=${ENDPOINT_ID}`;
exports.sql = (0, postgres_1.default)(URL, { ssl: 'require' });
const DbData = (0, postgres_1.default)({
    host: PGHOST || '',
    database: PGDATABASE || '',
    username: PGUSER || '',
    password: PGPASSWORD || '',
    port: 5432,
    ssl: 'require',
    connection: {
        options: `project=${ENDPOINT_ID || ''}`,
    },
});
exports.DbData = DbData;
