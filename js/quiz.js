var username = "no username";
var email;

function updateUsername(){
	printLog("#prePartTwo", "updateUsername called():");
	username = document.querySelector('#username').value;
	printLog("#prePartTwo", `  username assigned to ${username}`);
}
function updateEmail(event) {
	printLog("#prePartTwo", "updateEmail called():");
	email = event.target.value;
	printLog("#prePartTwo", `  email assigned to ${email}`);
}
function printInfo() {
	document.querySelector('#userInfo').innerHTML = `<strong>${username} - <em>${email}</em></strong>`;
	printLog("#prePartTwo", `printInfo called(): ${username} - ${email}`);
}
function resetInfo() {
	var usernameElement = document.querySelector('#username');
	usernameElement.value = "";
	document.querySelector('#email').value = "";
	document.querySelector('#userInfo').innerText = "unknown person";
	document.querySelector('#prePartTwo').innerHTML = "History:<br><br>";

	usernameElement.focus();
}
