// ==UserScript==
// @name         Force Subscriptions List View
// @version      1.2
// @description  Removes shorts or other absolute garbage that youtube thinks we care about.
// @author       Multarix
// @match        http://*.youtube.com/*
// @match        https://*.youtube.com/*
// @match        *youtube*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @downloadURL  https://github.com/Multarix/force-youtube-subscription-list-view/raw/master/script.user.js
// @updateURL    https://github.com/Multarix/force-youtube-subscription-list-View/raw/master/script.user.js

// ==/UserScript==

let cookieIsFine = false;

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}


// function getCookie(cname){
// 	return "f6=40000400&tz=Australia.Brisbane";
// }


const reg = /f6\=(\d+)&(.+)/g
const cook = getCookie("PREF");

const regFoundArray = reg.exec(cook);
let dataToChange = regFoundArray[1];


if(dataToChange.endsWith("1")) cookieIsFine = true;
console.log(cookieIsFine);


if(!cookieIsFine){
	dataToChange = dataToChange.slice(0, dataToChange.length - 1) + "1";

	const newData = `f6=${dataToChange}&${regFoundArray[2]}`
	document.cookie = "PREF=" + newData;
	
	if(window.location.href.includes("/feed/subscriptions")) location.reload();
}
