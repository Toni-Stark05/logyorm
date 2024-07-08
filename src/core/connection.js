"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnection = exports.Connection = void 0;
const pg_1 = require("pg");
class Connection {
    constructor(options) {
        this.options = options;
        this.pool = new pg_1.Pool({
            host: options.host,
            port: options.port,
            user: options.username,
            password: options.password,
            database: options.database,
        });
    }
    query(queryText, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                const res = yield client.query(queryText, params);
                return res.rows;
            }
            finally {
                client.release();
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.end();
        });
    }
}
exports.Connection = Connection;
function createConnection(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = new Connection(options);
        // Here you can add additional initialization logic if needed
        return connection;
    });
}
exports.createConnection = createConnection;
