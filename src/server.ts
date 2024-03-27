import express, { Router } from "express"
import routes from "./routes/routes";
import authRoutes from "./routes/auth.routes";
import cors from 'cors'
import authRegistre from "./routes/registre.routes";
import get from "./routes/get.routes";
import options from "../src/middleware/cors/app.cors";
import verificaRoutes from "./routes/rotaProtegida.routes";
import rotateste from "./routes/rotateste.routes";
import dropBoxRouter from "./routes/routerDropBox.routes";
import dropboxRoutes from "./routes/dropbox.routes";
import cookieParser from "cookie-parser";
import filerouter from "./routes/File.routes";
import strategy from "./routes/emaiLogin.routes";

const app = express();

app.use(cookieParser());
app.use(cors);
app.use(express.json());
app.use(routes);
app.use(authRoutes)
app.use(authRegistre)
app.use(verificaRoutes)
app.use(rotateste)
app.use(get)
app.use(dropboxRoutes)
app.use(dropBoxRouter)
app.use(filerouter)

app.use("/api",strategy)
// Middleware de tratamento de erro

// Adicione esse middleware para configurar os cabeçalhos CORS


app.listen(3000, () => console.warn("Serve is running on port 3000"));

