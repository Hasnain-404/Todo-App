import express from 'express';
import connectDB from './configs/dbConfig.js';
import router from './routes/toDo.routes.js';
import userRouter from './routes/user.routes.js';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000

app.use(express.json())

//cookie-parser
app.use(cookieParser())

// CORS Configuration
const corsOptions = {
    origin: "http://localhost:5173", // Allow your frontend origin
    credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions))

//connect to db
connectDB()

//routes
app.use("/todo", router)
app.use("/auth", userRouter)


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING");
});
