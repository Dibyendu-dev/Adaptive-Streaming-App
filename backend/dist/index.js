"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_config_1 = require("./config/server.config");
const app = (0, express_1.default)();
app.get("/ping", (_req, res) => {
    res.json({
        message: "pong",
    });
});
app.listen(server_config_1.PORT, () => {
    console.log("Server is running on port 3000");
});
