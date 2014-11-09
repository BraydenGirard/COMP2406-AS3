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
userPerm['chris'] = 2;
userPerm['lucas'] = 2;
userPerm['muhammad'] = 2;
userPerm['lee'] = 2;
userPerm['louis'] = 1;

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
        res.redirect('/prof');
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
			/*res.render('student.jade', {username:req.session.username,
				   	 					title:'Account',
				    					loggedInUsers: loggedInUsers,
				    					completion: completion,
				    					start: start,
				    					deadline: deadline});*/
			res.render('student.jade', buildReturnObject(req.session.username, 'Account', loggedInUsers));
		} else {
			res.redirect('/?error=Improper Permission');
		}
    } else {
	res.redirect('/?error=Not Logged In');
    }
};

function buildReturnObject(user, title, loggedInUsers) {
	var value = {username: user, title: title, loggedInUsers: loggedInUsers, as1chris: completion['as1chris'], 
	as2chris: completion['as2chris'], as3chris: completion['as3chris'], as4chris: completion['as4chris'], 
	as1lucas: completion['as1lucas'], as2lucas: completion['as2lucas'], as3lucas: completion['as3lucas'], 
	as4lucas: completion['as4lucas'], as1muhammad: completion['as1muhammad'], as2muhammad: completion['as2muhammad'], 
	as3muhammad: completion['as3muhammad'], as4muhammad: completion['as4muhammad'], as1lee: completion['as1lee'], 
	as2lee: completion['as2lee'], as3lee: completion['as3lee'], as4lee: completion['as4lee'], as1start: start['as1'], 
	as2start: start['as2'], as3start: start['as3'], as4start: start['as4'], as1dead: deadline['as1'], 
	as2dead: deadline['as2'], as3dead: deadline['as3'], as4dead: deadline['as4']};
	return value;
}

function ta(req, res) {
    if (req.session.username) {
		if(userPerm[req.session.username] === 2) {
			/*res.render('ta.jade', {username:req.session.username,
				   	 					title:'Account',
				    					loggedInUsers: loggedInUsers});*/
			res.render('ta.jade', buildReturnObject(req.session.username, 'Account', loggedInUsers));
		} else {
			res.redirect('/ta/?error=Improper Permission');
		}
    } else {
	res.redirect('/?error=Not Logged In');
    }
};

function prof(req, res) {
    if (req.session.username) {
		if(userPerm[req.session.username] === 1) {
			/*res.render('prof.jade', {username:req.session.username,
				   	 					title:'Account',
				    					loggedInUsers: loggedInUsers});*/
			res.render('prof.jade', buildReturnObject(req.session.username, 'Account', loggedInUsers));
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
	console.log(username);
	console.log(userDB[username]);
	console.log(password);
	if(userDB[username] && userDB[username] === password) {
	    req.session.username = username;
		req.session.permission = userPerm[username];
	    loggedInUsers[username] = LoggedIn;
		console.log("Valid login!!!");
		if(userPerm[username] === 3) {
	    	res.redirect('/student');
		} else if(userPerm[username] === 2) {
			res.redirect('/ta');
			console.log("TA login!!!");
		} else if(userPerm[username] === 1) {
			res.redirect('/prof');
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
	
	if(deadline[as] >= date)
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

function profupdate(req, res) {
	var as = req.body.as;
	var username = req.session.username;
	var dateStart = new Date(req.body.dateStart);
	var dateEnd = new Date(req.body.dateEnd);
	
	start[as] = dateStart;
	deadline[as] = dateEnd;
	
	//for each (var user in userDB)
	for (var user in userDB)
	{
		if(userPerm[user] === 2)
		{
			//They are a TA so add to completion
			completion[as + user] = 'in progress';
		}
	}
	
	res.redirect('/prof');
}


exports.index = index;
exports.student = student;
exports.ta = ta;
exports.prof = prof;
exports.login = login;
exports.logout = logout;
exports.taupdate = taupdate;
exports.profupdate = profupdate;
