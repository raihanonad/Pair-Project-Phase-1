class UserController {
    static registerForm(req, res) {
        res.render()
    }

    static postRegister(req, res) {
        
    }

    static async test(req,res) {
        try {
            res.render('login')
        } catch (error) {
            throw error
        }
    }

    static async testHome(req,res) {
        try {
            res.render('home')
        } catch (error) {
            throw error
        }
    }
}

module.exports = UserController