module.exports = function(app, passport) {

    //Home Page with links
    app.get("/", function(req, res) {
        res.render("index.ejs");
    });

    //Login form 
    app.get("/login", function(req, res) {
        res.render("login.ejs", {message: req.flash('loginMessage')});
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/display', 
        failureRedirect : '/login', 
        failureFlash : true 
    }));

    //SignUp form
    app.get("/signup", function(req,res){
        res.render("signup.ejs",{message: req.flash('signupMessage')});
    });
    
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/display', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    app.get('/display', isLoggedIn, function(req, res) {
        res.render('display.ejs', {
            user: req.user
        });
    });
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated())
            return next();
        req.redirect("/");
    }
}