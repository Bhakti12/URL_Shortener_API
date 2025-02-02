"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
require("reflect-metadata");
const mongoConfig_1 = require("./lib/config/mongoConfig");
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_config_1 = __importDefault(require("./lib/config/swagger_config"));
const express_oas_generator_1 = __importDefault(require("express-oas-generator"));
const indexRoute_1 = __importDefault(require("./lib/route/indexRoute"));
const config_1 = require("./lib/config/config");
// import swaggerDocument from '../docs/swagger_output.json';
const app = (0, express_1.default)();
express_oas_generator_1.default.handleResponses(app, swagger_config_1.default);
app.use((0, express_1.json)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
(0, mongoConfig_1.DatabaseConnection)();
app.use('/analytics', indexRoute_1.default.analyticsRouter);
app.use('/url', indexRoute_1.default.urlRouter);
app.use('/', indexRoute_1.default.gAuthRouter);
// app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
express_oas_generator_1.default.handleRequests();
app.listen(config_1.config.PORT, () => {
    console.log(`Server is running on http://localhost:${config_1.config.PORT}`);
});
