import 'dotenv/config'
import express from 'express';
import cors from 'cors'
import sequelize from './db/config'
import './db/models'
import cookieParser from 'cookie-parser';
import router from './routes'

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ alter: true })
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    } catch (e) {
        console.log(e);
        throw e
    }
}

start()