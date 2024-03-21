const express = require('express');
const UserController = require('./controllers/UserController');
const app = express()
const port = 3000


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));


app.get('/register', UserController.registerUserForm)
app.post('/register', UserController.postRegisterUser)
app.get('/login', (req, res)=>{
    res.render('login')
})
app.post('/login', (req, res)=>{
    res.render('login')
})

app.get('/', (req, res)=> {
    res.render('home')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})