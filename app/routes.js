module.exports = function(app, passport) {
    
    var data = require('../data/products.json');  //products.json file

    //Home Page with links
    app.get("/", function(req, res) {
        res.render("index.ejs");
    });

    //Login form 
    app.get("/login", function(req, res) {
        res.render("login.ejs", {message: req.flash('loginMessage')});
    });

    //To handle the post request from login page 
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/display', 
        failureRedirect : '/login', 
        failureFlash : true 
    }));

    //SignUp form
    app.get("/signup", function(req,res){
        res.render("signup.ejs",{message: req.flash('signupMessage')});
    });
    
    //Handling post request from signup page
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/login', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    //Display page where all the data will be stored and displayed
    app.get('/display', isLoggedIn, function(req, res) {
        var dataToEJS = {
            data : data
        }
        res.render('display.ejs', dataToEJS);
    });

    //logout button
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    //To check if the user is logged in
    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated())
            return next();
        req.redirect("/");
    }
}