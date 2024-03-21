const {User, Profile, Product, Category} = require('../models')
const bcrypt = require("bcryptjs")
class UserController {
    static async registerUserForm(req, res) {
        try {
            res.render('register')
        } catch (error) {
            res.send(error)
        }
    }

    static async postRegisterUser(req, res) {
        try {
            let {username, email, password, role} = req.body
            let user = await User.create({username, email, password, role})
            res.redirect(`/create-profile?id=${user.dataValues.id}`)
        } catch (error) {
            res.send(error.message)
        }
    }

    static async loginUser(req, res) {
        try {
            let {error} = req.query
            res.render("login", {error})
        } catch (error) {
            res.send(error)
        }
    }

    static async loginUserPost(req, res) {
        try {
          let {username, password} = req.body
          await User.findOne({where:{username}}).then((user) => {
            if (user) {
              const isValidPass = bcrypt.compareSync(password, user.password)
              if (isValidPass) {
                req.session.user = {
                  id: user.id,
                  username: user.username,
                  role: user.role
                }
                // console.log(user.id);
                if (user.role === "admin") {
                  res.redirect("/admin")
                } else if (user.role === "customer") {
                  res.redirect("/products")
                }
              } else {
                let error = "Invalid Username/Password"
                return res.redirect(`/login?error=${error}`)
              }
            } else {
              let error = "Invalid Username/Password"
              return res.redirect(`/login?error=${error}`)
            }
          })
        } catch (error) {
          res.send(error)
        }
      }

      static async logoutUser(req, res) {
        try {
          req.session.destroy((err) => {
            if (err) {
              console.log(err)
            } else {
              res.redirect("/")
            }
          })
        } catch (error) {}
      }
      
      static async createProfile(req, res) {
        try {
          let id = req.query.id
          res.render("create-profile", {id})
        } catch (error) {
          res.send(error)
        }
      }
      
      static async createProfilePost(req, res) {
        try {
          let id = req.query.id
          // console.log(id, "<<<<<<<<<<<");
          const { name, gender, phone, dateOfBirth, address } = req.body;
          await Profile.create({
            name: name,
            gender: gender,
            phone: phone,
            dateOfBirth: dateOfBirth,
            address: address,
            UserId: id,
          });
          res.redirect("/");
        } catch (error) {
          console.log(error);
          // res.send("hhh");
          // res.send(error)
        }
      }
      static async logoutUser(req, res) {
        try {
          req.session.destroy((err) => {
            if (err) {
              console.log(err);
            } else {
              res.redirect("/");
            }
          });
        } catch (error) {}
      }
      static async createProfile(req, res) {
        try {
          const id = req.query.id
          res.render("create-profile", {id});
        } catch (error) {
          res.send(error);
        }
      }
      static async createProfilePost(req, res) {
        try {
          const id = req.query.id;
          // console.log(id, "<<<<<<<<<<<");
          const { name, gender, phone, dateOfBirth, address } = req.body;
          await Profile.create({
            name: name,
            gender: gender,
            phone: phone,
            dateOfBirth: dateOfBirth,
            address: address,
            UserId: id,
          });
          res.redirect("/");
        } catch (error) {
          console.log(error.message);
          res.send("hhh");
        }
      }
      static async showListProduct(req, res) {
        try {
          const category = req.query.sortCategory
          const {nameProduct} = req.query
          if (category) {
            const product = await Product.findAll({
              include: {
                model: Category,
                where: {name: category}
              },
              order: [["id", "ASC"]]
            })
            res.render("product-list", {product, nameProduct})
          } else {
            const product = await Product.findAll({
              include: Category,
              order: [["id", "ASC"]]
            })
            res.render("product-list", {product, nameProduct})
          }
        } catch (error) {
          console.log(error)
          res.send(error)
        }
    }
    
      // static async showProfile(req, res) {
      //   try {
      //     const {id} = req.params
      //     console.log(id)
      //     const userId = req.session.user
      //     // console.log(userId, "LLLLLLLLLLLLLLLLLLL")
      //     const user = await User.findByPk(id)
      //     // console.log(user, "LLLLLLL");
      //     res.render("user", {user})
      //   } catch (error) {
      //     console.log(error, "<<<<<<<<");
      //     res.send(error)
      //   }
      // }
    
    static async addToCart(req, res) {
        try {
          const id = req.params.id
          const product = await Product.findOne({
            where: {id: id},
            include: Category
          })
    
          let data = await Product.decrement("stock", {
            where: {
              id: id
            },
            by: 1
          })
          res.render("transaction", {product})
        } catch (error) {
          res.send(error)
        }
    }

    static async displayCart(req, res) {
        try {
          const {user} = req.session
          const profile = await Profile.findOne({
            where: { UserId: user.id },
            include: {
              model: Product,
              through: Transaction
            }
          })
          res.render("cart", {profile})
        } catch (error) {
          res.send(error)
        }
    }
}

module.exports = UserController