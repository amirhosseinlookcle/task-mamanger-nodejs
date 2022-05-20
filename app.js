const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connection');
require('dotenv').config();
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.json())
app.use(express.static('./public'))

// routes
app.use('/api/v1/tasks', tasks);
app.use(errorHandlerMiddleware)
// routes.get('/', (req, res) => {
//     res.send('task manager app')
// })
app.use(notFound)
const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Listening on port ${port}`));
    } catch (err) {
        console.log(err)
    }
}

start();

// 01:27:13