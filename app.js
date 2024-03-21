const express = require('express');
const AdminController = require('./controllers/AdminController');
const qrcode = require('qrcode')
const UserController = require('./controllers/UserController')
const transaction = require('./models/transaction')
const app = express()
const port = 3000


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret : "keyboard cat",
  resave : false,
  saveUninitialized : false,
  cookie : { 
  secure : false,
  sameSite : true}
}))


app.get('/register', AdminController.registerUserForm)
app.post('/register', AdminController.postRegisterUser)
app.get('/login', AdminController.loginUser)
app.post('/login', AdminController.loginUserPost)
app.get('/logout', AdminController.logoutUser)
app.get('/create-profile', AdminController.createProfile)
app.post('/create-profile', AdminController.createProfilePost)

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

app.get('/products', UserController.getProduct)
// app.get("/showProfile/:id", UserController.showProfile)
app.get('/transaction/:id', UserController.addToCart)
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

app.get('/admin', AdminController.showListProduct)
app.get('/admin/add', AdminController.getAddProduct)
app.post('/admin/add', AdminController.addPostProduct)
app.get('/admin/:productid/increase-stock', AdminController.getIncrementProduct)
app.get('/admin/:productid/decrease-stock', AdminController.getDecreaseProduct)
app.get('/admin/:productid/delete', AdminController.deleteProduct)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})