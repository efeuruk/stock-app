"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var connect_history_api_fallback_1 = __importDefault(require("connect-history-api-fallback"));
var auth_routes_1 = __importDefault(require("./routes/auth.routes"));
var data_routes_1 = __importDefault(require("./routes/data.routes"));
var app = express_1.default();
var port = process.env.PORT || 3001;
var staticFileMiddleware = express_1.default.static("./frontend/dist");
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/data", data_routes_1.default);
app.use(staticFileMiddleware);
app.use(connect_history_api_fallback_1.default({
    disableDotRule: true,
    verbose: true,
}));
app.use(staticFileMiddleware);
app.listen(port, function () {
    console.log("Server started on " + port);
});
