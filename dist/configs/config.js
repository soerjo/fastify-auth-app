"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.port = (process.env.PORT || 5000);
