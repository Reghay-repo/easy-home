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



// route to team
app.get('/team', (req,res) => {
    res.render('team')
})

// routes to services 

app.get('/solution-it', (req,res) => {
    res.render('services/solution_it')
})


app.get('/communication-marketing', (req,res) => {
    res.render('services/communication_marketing')
})

app.get('/formation-et-elearning', (req,res) => {
    res.render('services/formation_elearning')
})

app.get('/accompagnement-entreprises', (req,res) => {
    res.render('services/accompagnement_des_entreprises')
})
app.get('/numeria', (req,res) => {
    res.render('services/numeria')
})


// route to random link
app.get('*', (req,res) => {
    res.render('404')
})


// setup server on port 3000
app.listen(port, () => {
    console.log(`serving your app on http://localhost:${port}`)
})