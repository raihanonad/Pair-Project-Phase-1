const express = require('express');
const UserController = require('./controllers/UserController');
const qrcode = require('qrcode')
const CustomerController = require('./controllers/CustomerController')
const transaction = require('./models/transaction')
const app = express()
const port = 3000


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));


app.get('/register', UserController.registerUserForm)
app.post('/register', UserController.postRegisterUser)
app.get('/login', UserController.loginUser)
app.post('/login', UserController.loginUserPost)
app.get('/logout', UserController.logoutUser)
app.get('/create-profile', UserController.createProfile)
app.post('/create-profile', UserController.createProfilePost)

// app.use('/login', UserController.test)
// app.post('/login', (req, res)=>{
//     res.render('login')
// })

app.get('/', (req, res) => {
  res.render('home')
})

app.use(function(req,res,next) {
  if (!req.session.user){
      const error = "Please Login to Access"
      res.redirect(`/login?error=${error}`)
  } else {
      next()
  }
})

app.get('/products', CustomerController.getProduct)
// app.get("/showProfile/:id", CustomerController.showProfile)
app.get('/transaction/:id', CustomerController.addToCart)
app.post('/transaction/:id', (req,res,next) => {
  const body = req.body
  const dataForQRCode = `${body.Delivery}-${body.Payment}`
  qrcode.toDataURL(dataForQRCode, (err,src) => {
      if (err) {
          return next(err)
      }
      res.render("qrcode", {
          qr_code: src,
      })
  })
})

app.use(function(req,res,next) {
  // console.log(req.session)
  if (req.session.user.role !== "admin"){
      const error = "You have no access"
      res.redirect(`/login?error=${error}`)
  } else {
      next()
  }
})

app.get('/admin', (req , res, next) => {
  if (!req.session.user){
      const error = "Please Login to Access" 
      res.redirect(`/login?error=${error}`)
  } else {
      next()
  }
})

app.get('/admin', UserController.showListProduct)
app.get('/admin/add', UserController.getAddProduct)
app.post('/admin/add', UserController.addPostProduct)
app.get('/admin/:productid/increase-stock', UserController.getIncrementProduct)
app.get('/admin/:productid/decrease-stock', UserController.getDecreaseProduct)
app.get('/admin/:productid/delete', UserController.deleteProduct)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})