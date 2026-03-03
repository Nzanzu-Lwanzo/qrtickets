import dotenv from "dotenv";
dotenv.config();
import express from "express";

const App = express();
const PORT = process.env["PORT"] || 5555;

App.use(express.json());

App.listen(PORT, () => console.log("API running 🚀"));
