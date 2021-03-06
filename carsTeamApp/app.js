var express    = require('express')
  , app        = express()
  , logger     = require('morgan')
  , bodyParser = require('body-parser')
  , mongoose   = require('mongoose')
  , path = require('path')
  , port = process.env.PORT || 3000
  , carRoutes = require('./config/routes/cars')
  , mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/cars_db'


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//connect to mongodb via mongoose
mongoose.connect(mongoUri, function(){
  console.log('Mongodb connected to db cars via mongoUri')
})


app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');


//use cars route file
app.use('/cars', carRoutes)


//listen on port
app.listen(port)
console.log("connected to port " + port )
