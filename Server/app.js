const express = require('express')
const app = express()


const cookieParser = require('cookie-parser')

// For Hiding relevant information
const dotenv = require('dotenv')
dotenv.config({path : './config.env'})

// Database
require('./db/Database')

//Cookie
app.use(cookieParser())


// Adding Middleware To Understand Json Input
app.use(express.json())

// Routes
app.use(require('./router/auth.js'))

// Port
PORT = process.env.PORT

const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};


// Serve Static assets if in production
if (process.env.NODE_ENV === 'production') {
    // set Static folder
    app.use(express.static('../src/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..','src','build','index.html'))
    })
}


// EJS 
app.set('view engine', 'ejs')

// Public Folder
app.use(express.static('./public'))


app.listen(PORT, () => {
    console.log(`Server is Running`)
})