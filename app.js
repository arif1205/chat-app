// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// internal imports
const {
	notFoundHandler,
	defaultErrorHandler,
} = require("./middleware/common/errorHandler");
const decorateHtmlResponse = require("./middleware/common/decorateHtmlResponse");

// import routers
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

const app = express();
dotenv.config();

// mongoose connection
mongoose
	.connect(process.env.MONGO_CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("database connection successful!"))
	.catch((err) => console.log(err));

// req parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// set cookie parsers
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", decorateHtmlResponse("Login"), loginRouter);
app.use("/users", decorateHtmlResponse("Users"), usersRouter);
app.use("/inbox", decorateHtmlResponse("Inbox"), inboxRouter);

/**
 * Error handlers
 */
// not found
app.use(notFoundHandler);
// deafult error handler
app.use(defaultErrorHandler);

app.listen(process.env.PORT, () => {
	console.log("Listening on port: " + process.env.PORT);
});
