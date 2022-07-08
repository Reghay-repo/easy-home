const express       = require('express')

const path          = require('path')
const port          = process.env.PORT || 3000
const app           = express()
const ejsMate = require('ejs-mate')






// set ejs as view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs',ejsMate )
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))







// route to home
app.get('/', (req,res) => {
    res.render('home')
})

// route to contact
app.get('/contact', (req,res) => {
    res.render('contact')
})




// setup server on port 3000
app.listen(port, () => {
    console.log(`serving your app on http://localhost:${port}`)
})