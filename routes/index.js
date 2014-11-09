var loggedInUsers = {};
var LoggedIn = 'TheUserIsLoggedIn';

var userDB = {};
userDB['student1'] = 'student1pass';
userDB['student2'] = 'student2pass';
userDB['chris'] = 'chrispass';
userDB['lucas'] = 'lucaspass';
userDB['muhammad'] = 'muhammadpass';
userDB['lee'] = 'leepass';
userDB['louis'] = 'louispass';

var userPerm = {};
userPerm['student1'] = 3;
userPerm['student2'] = 3;
userPerm['ta1'] = 2;
userPerm['proff1'] = 1;

var deadline = {};
deadline['as1'] = '';
deadline['as2'] = '';
deadline['as3'] = '';
deadline['as4'] = '';

var start = {};
start['as1'] = '';
start['as2'] = '';
start['as3'] = '';
start['as4'] = '';

var completion = {};
completion['as1chris'] = '';
completion['as2chris'] = '';
completion['as3chris'] = '';
completion['as4chris'] = '';
completion['as1lucas'] = '';
completion['as2lucas'] = '';
completion['as3lucas'] = '';
completion['as4lucas'] = '';
completion['as1muhammad'] = '';
completion['as2muhammad'] = '';
completion['as3muhammad'] = '';
completion['as4muhammad'] = '';
completion['as1lee'] = '';
completion['as2lee'] = '';
completion['as3lee'] = '';
completion['as4lee'] = '';

function index(req, res) {
    if (req.session.username && req.session.permission === 1) {
        res.redirect('/proff');
    } else if(req.session.username && req.session.permission === 2) {
    	res.redirect('/ta');
    } else if(req.session.username && req.session.permission === 3) {
		res.redirect('/student');
	} else {
	res.render('index', { title: 'COMP 2406 Assignment Grading', 
			      error: req.query.error });
    }
}

function student(req, res) {
    if (req.session.username) {
		if(userPerm[req.session.username] === 3) {
			res.render('student.jade', {username:req.session.username,
				   	 					title:'Account',
				    					loggedInUsers: loggedInUsers});
		} else {
			res.redirect('/?error=Improper Permission');
		}
    } else {
	res.redirect('/?error=Not Logged In');
    }
};

function ta(req, res) {
    if (req.session.username) {
		if(userPerm[req.session.username] === 2) {
			res.render('ta.jade', {username:req.session.username,
				   	 					title:'Account',
				    					loggedInUsers: loggedInUsers});
		} else {
			res.redirect('/ta/?error=Improper Permission');
		}
    } else {
	res.redirect('/?error=Not Logged In');
    }
};

function proff(req, res) {
    if (req.session.username) {
		if(userPerm[req.session.username] === 1) {
			res.render('proff.jade', {username:req.session.username,
				   	 					title:'Account',
				    					loggedInUsers: loggedInUsers});
		} else {
			res.redirect('/?error=Improper Permission');
		}
    } else {
	res.redirect('/?error=Not Logged In');
    }
};

function login(req, res) {
    var username = req.body.username;
	var password = req.body.password;
	
	if(userDB[username] && userDB[username] === password) {
	    req.session.username = username;
		req.session.permission = userPerm[username];
	    loggedInUsers[username] = LoggedIn;

<<<<<<< HEAD
=======
		res.cookie("permission", userPerm[username].toString(), {maxAge: 60*60*1000, httpOnly: true, path: '/'});
>>>>>>> 68ce45942f37208edd797e9b20c49b938a63b0c3
		if(userPerm[username] === 3) {
	    	res.redirect('/student');
		} else if(userPerm[username] === 2) {
			res.redirect('/ta');
		} else if(userPerm[username] === 1) {
			res.redirect('/proff');
		}

	} else {
		res.redirect('/?error=Incorrect login');
	}
  
}

function logout(req, res) {
    delete loggedInUsers[req.session.username];
    req.session.destroy(function(err){
        if(err){
            console.log('Error: %s', err);
        }
    });
    res.redirect('/');
}

function taupdate(req, res) {
	var as = req.body.as;
	var username = req.session.username;
	var date = new Date(req.body.date);
	
	if(date.compare(deadlines[as], date) === 1)
	{
		//Assignemnt on time
		completion[as + username] = 'ON TIME';
	} else
	{
		//Not on time
		completion[as + username] = 'LATE';
	}
	
	res.redirect('/ta');
}

function proffupdate(req, res) {
	var as = req.body.as;
	var username = req.session.username;
	var dateStart = new Date(req.body.dateStart);
	var dateEnd = new Date(req.body.dateEnd);
	
	start[as] = dateStart;
	deadline[as] = dateEnd;
	
	for each (var user in userDB)
	{
		if(userPerm[user] === 2)
		{
			//They are a TA so add to completion
			completion[as + user] = 'in progress';
		}
	}
	
	res.redirect('/proff');
}

exports.index = index;
exports.student = student;
exports.ta = ta;
exports.proff = proff;
exports.login = login;
exports.logout = logout;
exports.taupdate = taupdate;
exports.proffupdate = proffupdate;
