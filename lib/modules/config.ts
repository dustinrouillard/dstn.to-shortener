import dotenv from 'dotenv';
dotenv.config();

export const App = {
    Port: process.env.PORT || 9090
}