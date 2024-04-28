import express from 'express';
import userRoutes from './routes/userRoutes.js'
import db from './config/db.js';

const app = express();

app.use(express.urlencoded({extended: true}))

//Db Connection
try {
    await db.authenticate()
    db.sync()
    console.log('CONNECTED TO DATABASE')
} catch(error) {
    console.log('error')
}

// Pug
app.set('view engine', 'pug')
app.set('views', './views')

// Public Folder
app.use(express.static('public'))

app.use('/auth', userRoutes)

const port = 3000;
app.listen(port, () => {
    console.log(`The Server its running in the port ${port}`)
});