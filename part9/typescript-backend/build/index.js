"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnoseRoute_1 = __importDefault(require("./routes/diagnoseRoute"));
const app = express_1.default();
app.use(cors_1.default());
app.use('/api/diagnoses', diagnoseRoute_1.default);
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
app.listen(3001);
