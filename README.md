# [COMP 2406-A3](https://github.com/BraydenGirard/COMP2406-AS3)
Benjamin Sweett (100846396)
Brayden Girard (100852106)

In the past profs have often gotten emails from students wondering why their assignment has not been marked when their friend's assignment have already been marked. This is ussually becasue one TA has finished their marking ahead of others, and ahead of the marking deadline. To help reduce these concerns, and help manage the TA's tasks the school of computer science has, in recent course offerings, maintained a marking progress chart.

Students have found it helpful for the profs and TAs to post this information and it has been helpful for managing TA tasks. Unfortuantely, updating the chart is completely manual. When an assignment is finished the prof. will edit the chart and enter the marking start date and expected completion date and a comment indicating that marking is "in progress" and then save the file back to the web site. When a TA has finished their marking and entered their marks in culearn they email the prof. who then again edits the chart and enters the completion date and modifies the comment to "on time" or "late".

We have built a server that manages the chart and allows the students, prof. and TA's to login and view the contents. When the prof. logs in they will be able to edit the start and deadline dates. When a TA logs in they will be able to enter their completion date. The "in progress", "on time" and "late" comments are created automagically by the server.

This assignment is based on the form handling code in notes section 08 and the cookies and session code examples in notes section 10.

* Source: [https://github.com/venom889/COMP2406-A2](https://github.com/BraydenGirard/COMP2406-AS3)


## Quick start

Please run the server applications in the following order:

1. Run the Furnace app found in /node using "node FurnaceApp.js"

2. Run the Web Server app found in /html-server using "node https_server.js"

3. Run the Thermostat app found in /node using "node ThermostatApp.js"

4. The web page will be visible at: https://localhost:3000/index.html

NOTE: Apps must be run from thier directory in order to allow for 
resource paths to be properly found


## Features

* Cross-browser compatible (Chrome, Safari, Firefox 3.6+).
* Uses [Node.js Express](http://expressjs.com/)
* Allows users to log in with thier predefined accounts
* Users can preform specific actions based on thier account level:
	* Level 1 - the prof can set an assignment start and deadline for grading date
	* Level 2 - all the TAs can set a completion date for assignments after they have been created by the prof
	* Level 3 - students can only view the table not edit it
* The comment section is automatically updated with the status of the TAs marking
* Users can also Logout to remove thier session


## Known Issues

The following issues are known problems with our implementation:

1. Due to self-signed certificates HTTPS will not work properly with our application

We have provided 2 verisons of our source one with HTTP and one with HTTPS. Our client side JS
requests will not work correctly if you do not add our HTTPS certificate (servercert.crt) to 
your browsers HTTPS/SSL certificates. If you cannot get the Browser to accept our self-signed 
certificate please run the HTTP version of the application found in /HTTP. 

2. Issue with Weather API JSON Parsing

When parsing the JSON data from Weather API the source provided from the notes sometimes throws 
and exception. We added a temporary fix by wrapping the parsing call in a try catch. If the 
weather request from the browser is made and parsing the API fails the request will not return
a response.

3. Refreshing the browser page causes the server to crash

Because the application is running on a recursive clock when users refresh the page after visiting
or using the application they enter an different state than what the thermostat, server, and furnace 
are running. This can sometimes cause the server to throw a connection exception with on of the 
sockets. If we were using the express framework these exceptions could be easily handled with middleware that
restarts the server. 

