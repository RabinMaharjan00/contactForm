import express from 'express'
import helmet from 'helmet'
import contacts from './routes/contact.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
const port = 5000;

app.use("/api", contacts)

app.listen(port,()=> {
    console.log(`app is running in ${port}`)
})