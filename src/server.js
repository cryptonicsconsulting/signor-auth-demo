// Imports
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const config = require("./configurations/config").config()
const routes = require("./routes/routes")
const GREEN = "\x1b[32m%s\x1b[0m"

// Express initailization
const app = express()

app.use(
  cors({
    exposedHeaders: ["Authorization, Content-disposition"],
  })
)
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use(bodyParser.json({ limit: "50mb", extended: true }))
app.use(express.static(__dirname + '/front'))

routes(app)

app.use((err, req, res, next) => {
  console.log(err)
  res.locals.error = err
  const status = err.status || 500
  res.status(status).send({ error: "Ops.. Something failed!", msg: err })
})

// Starting the app
const port = config.PORT
app.listen(port, () => {
  console.log(GREEN, `[OK] API listening on port ${port}`)
})
