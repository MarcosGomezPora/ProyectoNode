/* require('dotenv').config()
let PORT = process.env.PORT
PORT = 3000
 */


const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const auth = require("./src/utils/auth/index");
auth.activarAutenticacion();
const { isAuth } = require("./src/utils/auth/middlewares/authMiddlewares");

const db = require("./src/utils/db");
db.connectDB();

const moviesRoutes = require("./src/api/movies/movie.routes");
const directorsRoutes = require("./src/api/directors/director.routes");
const actorsRoutes = require('./src/api/actors/actor.routes');
const usersRoutes = require('./src/api/users/user.routes');

const PORT = process.env.PORT || 3030;
const server = express();

server.use(cors());

server.use(
    session({
        secret: process.env.SESSION_SECRET, 
        saveUninitialized: true,
        resave: false,
        cookie: { maxAge: 5 * 60 * 1000 }, 
        store: MongoStore.create({ mongoUrl: db.DB_URL }),
    })
);


server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.use(passport.initialize());
server.use(passport.session());


server.use("/users", usersRoutes);
server.use("/movies", moviesRoutes);
server.use("/directors", directorsRoutes);
server.use("/actors", actorsRoutes);



server.use("*", (req, res, next) => {
    return res.status(404).json("No se encuentra la URL. Prueba con otra URL");
});


server.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Unexpected Error!";
    return res.status(status).json(message);
});

server.listen(PORT, () => {
    console.log(`[Server] echando chispas en http://localhost:${PORT}`);
});