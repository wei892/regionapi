import app from "./server.js"
import mongodb from "mongodb"
import RegionsDAO from "./dao/regionsDAO.js"
import dotenv from 'dotenv'
dotenv.config();


const MongoClient = mongodb.MongoClient

let mongo_username = process.env.DB_USERNAME;
console.log(mongo_username)
let mongo_password = process.env.DB_PASSWORD;
console.log(mongo_password)
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.tbejsis.mongodb.net/?retryWrites=true&w=majority`;

const port = 8000

MongoClient.connect(
  uri,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await RegionsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port localhost:${port}`)
    })
  })