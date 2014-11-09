var loggedInUsers = {};
var LoggedIn = 'TheUserIsLoggedIn';

var userDB = {};
userDB["student1"] = "student1pass";
userDB["student2"] = "student2pass";
userDB["ta1"] = "ta1pass";
userDB["proff1"] = "proff1pass";

var userPerm = {};
userPerm["student1"] = 3;
userPerm["student2"] = 3;
userPerm["ta1"] = 2;
userPerm["proff1"] = 1;

var deadlines = {};

function index(req, res) {
    if (req.session.username) {
        res.redirect("/users");
    } else {
	res.render('index', { title: 'COMP 2406 Assignment Grading', 
			      error: req.query.error });
    }
}

function student(req, res) {
    if (req.session.username) {
		if(userPerm[req.session.username] === 3) {
			res.render("account.jade", {username:req.session.username,
				   	 					title:"Account",
				    					loggedInUsers: loggedInUsers});
		} else {
			res.redirect("/?error=Improper Permission");
		}
    } else {
	res.redirect("/?error=Not Logged In");
    }
};

function ta(req, res) {
    if (req.session.username) {
		if(userPerm[req.session.username] === 2) {
			res.render("account.jade", {username:req.session.username,
				   	 					title:"Account",
				    					loggedInUsers: loggedInUsers});
		} else {
			res.redirect("/ta/?error=Improper Permission");
		}
    } else {
	res.redirect("/?error=Not Logged In");
    }
};

function proff(req, res) {
    if (req.session.username) {
		if(userPerm[req.session.username] === 1) {
			res.render("account.jade", {username:req.session.username,
				   	 					title:"Account",
				    					loggedInUsers: loggedInUsers});
		} else {
			res.redirect("/?error=Improper Permission");
		}
    } else {
	res.redirect("/?error=Not Logged In");
    }
};

function login(req, res) {
    var username = req.body.username;
	var password = req.body.password;
	
	if(userDB[username] && userDB[username] === password) {
	    req.session.username = username;
		req.session.permission = userPerm[username];
	    loggedInUsers[username] = LoggedIn;

		res.cookie("permission", userPerm[username].toString(), {maxAge: 60*60*1000, httpOnly: true, path: '/'});
		if(userPerm[username] === 3) {
	    	res.redirect("/student");
		} else if(userPerm[username] === 2) {
			res.redirect("/ta");
		} else if(userPerm[username] === 1) {
			res.redirect("/proff");
		}

	} else {
		res.redirect("/?error=Incorrect login");
	}
  
}

function logout(req, res) {
    delete loggedInUsers[req.session.username];
    req.session.destroy(function(err){
        if(err){
            console.log("Error: %s", err);
        }
    });
    res.redirect("/");
}

function update(req, res) {
	var as = req.body.as;
	var date = new Date(req.body.date);
	var id = req.body.id;
	
	if(id === 'ta') {
		if(date.compare(deadlines[as], date) === 1)
		{
			//Assignemnt on time
		} else
		{
			//Not on time
		}
	} else if(id === 'proff') {
		deadlines[as] = date;
	}
}

exports.index = index;
exports.student = student;
exports.ta = ta;
exports.proff = proff;
exports.login = login;
exports.logout = logout;
exports.update = update;
