var express = require("express");
var app = express();
var port = (8080);
var passport = require("passport");
var github = require("github");
var bodyParser = require("body-parser");
var session = require("express-session");
var GithubStrategy = require("passport-github").Strategy;
var request = require("request");

var requireAuth = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(403).end("Hey, you need to log in");
  }
  return next();
}

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.use(session({
	secret: "key",
	resave: true,
	saveUninitialized: true
	 }));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done){
	done(null, obj);
});

passport.use(new GithubStrategy({
  clientID: '795325a8bc421d8a2e48',
  clientSecret: '3a852fa9d6115f017919fcf797f24fdad59a2e27',
  callbackURL: 'http://localhost:8080/auth/github/callback'
}, function(token, refreshToken, profile, done) {
	console.log('The profile is', profile);
  return done(null, profile);
}));

app.get("/auth/github", passport.authenticate("github"));

app.get("/auth/github/callback", passport.authenticate("github", {
	successRedirect: "/#/home",
	failureRedirect: "/"
}));

// app.get("/", requireAuth, function(req, res) {
// 	if (req.isAuthenticated()) {
// 		return res.sendFile(__dirname + "/public/home.html");
// }
// else {
// 	return res.redirect("/login.html");
// }
// });

app.get("/api/github/following", requireAuth, function(req, res){
	github.user.getFollowingFromUser({
		user: req.user.username
	}), function(err, response){
		res.json(response);
	}
})


app.get("/api/github/following", requireAuth, function(req, res){
	res.json(req.user)
})

app.listen(port);