"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const cors_1 = __importDefault(require("cors"));
const registre_routes_1 = __importDefault(require("./routes/registre.routes"));
const get_routes_1 = __importDefault(require("./routes/get.routes"));
const app_cors_1 = __importDefault(require("./middleware/cors/app.cors"));
const rotaProtegida_routes_1 = __importDefault(require("./routes/rotaProtegida.routes"));
const rotateste_routes_1 = __importDefault(require("./routes/rotateste.routes"));
const routerDropBox_routes_1 = __importDefault(require("./routes/routerDropBox.routes"));
const dropbox_routes_1 = __importDefault(require("./routes/dropbox.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const File_routes_1 = __importDefault(require("./routes/File.routes"));
const emaiLogin_routes_1 = __importDefault(require("./routes/emaiLogin.routes"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(app_cors_1.default));
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(auth_routes_1.default);
app.use(registre_routes_1.default);
app.use(rotaProtegida_routes_1.default);
app.use(rotateste_routes_1.default);
app.use(get_routes_1.default);
app.use(dropbox_routes_1.default);
app.use(routerDropBox_routes_1.default);
app.use(File_routes_1.default);
app.use("/api", emaiLogin_routes_1.default);
// Middleware de tratamento de erro
// Adicione esse middleware para configurar os cabeçalhos CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(3000, () => console.warn("Serve is running on port 3000"));
