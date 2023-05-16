import { config } from "dotenv";
config();

export const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://jVicente:12345@cluster0.u8fdjxz.mongodb.net/?retryWrites=true&w=majority";
export const PORT = 4000;

export const CLOUD_NAME = "do3ihoqvi";
export const API_KEY = "628996384542217";
export const API_SECRET = "JTAXg5aKV5gEDBC1F0ooHfaQt3c";