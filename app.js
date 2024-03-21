const express = require('express');
const UserController = require('./controllers/UserController');
const app = express()
const port = 3000


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));


app.use('/register', UserController.registerUserForm)
app.post('/register', UserController.postRegisterUser)
app.use('/login', UserController.test)
app.post('/login', (req, res)=>{
    res.render('login')
})

app.use('/', (req,res)=>{
  res.render('home')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})