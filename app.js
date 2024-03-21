const express = require('express');
const UserController = require('./controllers/UserController');
const app = express()
const port = 3000


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));


app.use('/register', UserController.registerUserForm)
app.post('/register', UserController.postRegisterUser)
// app.use('/login', UserController.test)
// app.post('/login', (req, res)=>{
//     res.render('login')
// })

<<<<<<< HEAD
app.use('/', (req,res)=>{
  res.render('home')
=======
app.use('/', (req, res)=> {
    res.render('home')
>>>>>>> 9a36a551c03ced526a50019e720b7918692a34fd
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})