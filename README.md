# [COMP 2406-A3](https://github.com/BraydenGirard/COMP2406-AS3)
Benjamin Sweett (100846396)
Brayden Girard (100852106)

In the past profs have often gotten emails from students wondering why their assignment has not been marked when their friend's assignment have already been marked. This is ussually becasue one TA has finished their marking ahead of others, and ahead of the marking deadline. To help reduce these concerns, and help manage the TA's tasks the school of computer science has, in recent course offerings, maintained a marking progress chart.

Students have found it helpful for the profs and TAs to post this information and it has been helpful for managing TA tasks. Unfortuantely, updating the chart is completely manual. When an assignment is finished the prof. will edit the chart and enter the marking start date and expected completion date and a comment indicating that marking is "in progress" and then save the file back to the web site. When a TA has finished their marking and entered their marks in culearn they email the prof. who then again edits the chart and enters the completion date and modifies the comment to "on time" or "late".

We have built a server that manages the chart and allows the students, prof. and TA's to login and view the contents. When the prof. logs in they will be able to edit the start and deadline dates. When a TA logs in they will be able to enter their completion date. The "in progress", "on time" and "late" comments are created automagically by the server.

This assignment is based on the form handling code in notes section 08 and the cookies and session code examples in notes section 10.

* Source: [https://github.com/BraydenGirard/COMP2406-AS3](https://github.com/BraydenGirard/COMP2406-AS3)


## Quick start

We tested our application in Chrome and FireFox on Mac OS X. To use the application:

1. Run the Node.js Express app using "npm start" from the command line

2. Open a browser and go to "http://localhost:3000/"

3. To login using one of the following test accounts: 
	**Level 1** 
	  Username: louis    Password: louispass
	**Level 2**
	  Username: chris    Password: chrispass
	  Username: lee      Password: leepass
	  Username: muhammad Password: muhammadpass
	  Username: lucas    Password: lucaspass
	**Level 3**
	  Username: student1 Password: student1pass
	  Username: student2 Password: student2pass
	
4. Prof and TA accounts will have an extra form at the bottom of the page which is used for adding dates
	**Once a TA has submitted a completion date the Profs account should not change the start and deadline dates**

5. Any user errors will be displayed near the top of the page in red or in a JS alert popup.


## Features

* Cross-browser compatible (Chrome, Safari, Firefox 3.6+).
* Uses [Node.js Express](http://expressjs.com/) and [jQuery](http://jquery.com/)
* Allows users to log in with thier predefined accounts
* Users can preform specific actions based on thier account level:
	* Level 1 - the prof can set an assignment start and deadline for grading date
	* Level 2 - all the TAs can set a completion date for assignments after they have been created by the prof
	* Level 3 - students can only view the table not edit it
* The comment section is automatically updated with the status of the TAs marking
* Users can also Logout to remove thier session


## Known Issues

The following issues are known problems with our implementation:

1. Prof accounts are allowed to change the start and deadline date after an assignment has been graded by a TA

This was not a requirement for the assignment so we allowed it to remain in the source. The TAs completion 
status' are reset because of it but the old styling is kept. This creates a bad data state the server should
be restarted.

2. Issue with styling in FireFox

The bottom line of each comment cell in the table is coloured with the status text for some strange reason. 
This doesn't occur in Chrome.

3. The date input only provides a format calender for Chrome

By default date inputs in chrome use a nicely formatted calender for easy selection of dates. We added some basic
client side validation for other browsers that accept just raw text inputs for thier date inputs. Dates should be
in the format "YYYY-MM-DD" in order to be submitted to the server. If at any point an invalid date is sent to the
server we do no more validation on it. It will display "Invalid Date" in the cell it was entered for.

