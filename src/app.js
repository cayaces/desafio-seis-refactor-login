import express from "express"
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import { createHash, isValidPassword } from "./utils.js"
import passport from "passport"
import initializePassport from "./config/passport.config.js"
import MongoStore from "connect-mongo"
import session from "express-session"
import User from "./models/User.js"
import userRouter from "./routes/user.router.js"
import viewsRouter from './routes/views.router.js'
import sessionsRouter from './routes/sessions.router.js'
import mongoose from 'mongoose'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    store: MongoStore.create({
     mongoUrl:"mongodb+srv://coderClau:7725AmorCODER@coderclau.lgoc83w.mongodb.net/?retryWrites=true&w=majority",
     mongoOptions:{useNewUrlParser: true, useUnifiedTopology: true},
     ttl: 600
    }),
  secret: "CoderKey",
  resave: false,
  saveUninitialized: false
})) 

initializePassport(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use("/api/sessions", sessionsRouter)

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
 

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})


