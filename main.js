/*

Development Innovation Ventures 
Application Form AB Test

***
***
This code is used to conduct an AB test of two 
different application forms for DIV. Users will 
be provided one of two possible forms at random. 
Users who have visited the page before will always
get the same form based on a randomly selected cookie 
set in their browser. (Given the informal nature of the
experiment, this code does not cover all possible ways 
that a user could access the form.) When DIV receives the 
application forms, we will conduct an AB test to compare
the answers provided in the applications.
***
***

*/

// cookie options
var cookie1 = 'cookie1';
var cookie2 = 'cookie2';

// two possible links that the user can get. Links will
// be replaced with final application links in implementation
var links = [
    'http://www.usaid.gov/div',
    'http://www.usaid.gov/div/apply'
];


//array of possible cookie arguments
var cookies = [
    ['cookie1', 'cookie1', 30],
    ['cookie2', 'cookie2', 30]
];

// randomizer (cookie generator)
var rand = cookies[Math.floor(Math.random() * cookies.length)];

// back-up randomizer of link in case code fails
var randLink = links[Math.floor(Math.random() * links.length)];


// Set a cookie in the browser
 function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}


//read the cookie function
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);    
	}
	return null;
 
}

// adds hyperlink to HTML element in DOM
function addlink(hyperlink) {
    $('#applicationLink').attr("href", hyperlink);
}

// read the cookie and see if the name matches the value via the argument
function read(cookie) {
    return (readCookie(cookie) == cookie)
}


//test against the value of the cookie. if value=cookie1 or cookie2, run linkAssignment(); if not, create cookie!!!!
function assignCookiesAndLinks() {
    //if cookie1 and cookie2 do not exist, create cookie
    if (!(read(cookie1)) && !(read(cookie2))) {
        createCookie.apply(this, rand);
    } 
    //assign link and cookie
    linkAssignment();
}

// Assigns links based on which cookie is read in the browser
function linkAssignment() {
    if (read(cookie1)) {
        addlink(links[0]);
    } else if (read(cookie2)) {
        addlink(links[1]);
    }
}

// attempts to run script above; if it fails, it randomly assigns one link
function runAbTest() {
        try {
            assignCookiesAndLinks();

        // if create cookies cannot run, randomly assign link
        } catch (e) {
            addlink(randLink);
        }
    }
   


$(runAbTest());



