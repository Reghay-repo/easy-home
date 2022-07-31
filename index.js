const express       = require('express')

const path          = require('path')
const port          = process.env.PORT || 3000
const app           = express()
const ejsMate = require('ejs-mate')
const nodeMailer    = require('nodemailer');

const data = require('./data')
// set ejs as view engine
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.set('views', path.join(__dirname, '/views'))
app.engine('ejs',ejsMate )
app.use(express.urlencoded({extended:true}))
const ExpressError =require('./utils/ExpressError')
app.use(express.json())

// app.use((err, req ,res, next) => {
//     if(err) {
//         console.log(err)
//     }
//     next()
//     // const {status = 500} = err
//     //  res.status(status).render('error', {err,status})
// })


// send email 
app.post('/send-email', function (req, res) {
    const {fname,lname,email,website,subject,options,body} = req.body

    console.log(subject)
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'your email', //email
            pass: 'your password'//password
        }
    });
    let mailOptions = {
        from: `"Krunal Lathiya" <${email}`, // sender address
        to: 'oussamareghaye1998@gmail.com', // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.body, // plain text body
        html: `
        <h3>Subject Line: ${subject}</h3>

        <h4>Website: ${website}</h4>
        
        <p>Hi my name is ${lname} ${fname},I found your website  ${options} .</p>
        
        <p>${body}</p>
        
        
        <p>Thank you,</p>
        
        <p>Yours sincerely</p>
        
        `, 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
            res.render('thankyou');
        });
    });

// contact us email
app.post('/contact-us', function (req, res) {
    res.send('we got')
    const {fname,lname,email,website,subject,options,body} = req.body

    console.log(subject)
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'oussamareghaye1998@gmail.com',
            pass: 'qteputrdhcrmxavg'
        }
    });
    let mailOptions = {
        from: `"Krunal Lathiya" <${email}`, // sender address
        to: 'oussamareghaye1998@gmail.com', // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.body, // plain text body
        html: `
        <h3>Subject Line: ${subject}</h3>

        <h4>Website: ${website}</h4>
        
        <p>Hi my name is ${lname} ${fname},I found your website  ${options} .</p>
        
        <p>${body}</p>
        
        
        <p>Thank you,</p>
        
        <p>Yours sincerely</p>
        
        `, // html body
        attachments: [
            {   // file on disk as an attachment
                filename: 'text3.txt',
                path: '/path/to/file.txt' // stream this file
            },
        ]
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('thankyou');
    });
});
    

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




// ============================================
// formations





app.get('/:link',  (req,res) => {
    const {link} = req.params;
   let obj =  data.filter(obj => {
     return obj.link === link
    })
    if(obj) {
        res.render('formations/page_formation', {obj: obj[0]})
    }
    
})
  
    


app.all('*', (req, res,next) => {
    next(new ExpressError('Page not found', 404))
})

app.use((err, req ,res, next) => {
    const {status = 500} = err
    if(! err.message) err.message = 'something went wrong!'
     res.status(status).render('404', {err,status})
})


// setup server on port 3000
app.listen(port, () => {
    console.log(`serving your app on http://localhost:${port}`)
})
