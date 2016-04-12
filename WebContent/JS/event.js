
	

// assign listeners on-load to buttons

var init = function() {

	document.textForm.submit.addEventListener("click", getOneEventFunction);

	document.buttonForm.submit.addEventListener("click", getAllEventsFunction);

	document.createForm.submit.addEventListener("click", putNewEventFunction);

	document.deleteForm.submit.addEventListener("click", deleteOneEventFunction);

	document.updateForm.submit.addEventListener("click", postUpdateOneEventFunction);

	document.populateForm.submit.addEventListener("click", functionToPopulateForm);

	

};

// get event by id , passing in event html object

var getOneEventFunction = function(event) {

	event.preventDefault(); // prevent redirect to another page

	var id = document.textForm.eventForm.value; // grab id from the text box

	var url = "rest/event/" + id; // path to my controller

	xhrMethod(displayEventList, url); // call HTTP request passing in callback
	// method and url to

};

// get all events , passing in event html object

var getAllEventsFunction = function(event) {

	event.preventDefault();

	var url = "rest/events";

	xhrMethod(displayEventList, url); // passing in callback method

};

// get all events , passing in event html object

var getAllEventsByCategory = function(event) {
	event.preventDefault();

	console.log(" In get all events by category")

	var category = document.myCategoryForm.category.value; // grab category
	// from the drop
	// down

	console.log(category + "  my choosen category");

	var url = "rest/events/" + category;

	xhrMethod(displayEventList, url); // passing in callback method

};

var putNewEventFunction = function(event, callback) {

	event.preventDefault();

	console.log(" In create new event")

	var title = document.createForm.title.value;
	var description = document.createForm.description.value; // grab
	// description
	// from form
	var amount = document.createForm.amount.value;
	var category = document.createForm.category.value;

	var newEvent = {};

	newEvent.title = title;
	newEvent.description = description;
	newEvent.amount = amount;
	newEvent.category = category;

	console.log(newEvent);

	var xhr = new XMLHttpRequest();

	xhr.open("PUT", "rest/newevent");

	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.send(JSON.stringify(newEvent));

	clearForms();

	xhr.onreadystatechange = function() {

		if (xhr.readyState === 4) {

			var eventList = [];

			/* var tempEvent = JSON.parse(xhr.responseText); */

			var tempEvent = JSON.parse(xhr.responseText);

			var convertedEvent = convertDate(tempEvent);

			console.log(convertedEvent);

			/*
			 * var tempDate = tempEvent.eventdate;
			 * 
			 * console.log(tempDate);
			 * 
			 * var dateObj = new Date(tempDate);
			 * 
			 * tempEvent.eventdate = dateObj;
			 * 
			 * console.log(tempEvent.eventdate);
			 */

			eventList.push(convertedEvent);

			displayEventList(eventList);

		}

	}

};

// delete event by id , passing in event html object

var deleteOneEventFunction = function(event) {

	event.preventDefault(); // prevent redirect to another page

	var id = document.deleteForm.eventForm.value; // grab id from the text box

	var url = "rest/deleteevent/" + id; // path to my controller

	var xhr = new XMLHttpRequest();

	xhr.open("DELETE", url);

	clearForms();

	xhr.onreadystatechange = function() {

		if (xhr.readyState === 4) {

			var eventList = [];

			var tempEvent = JSON.parse(xhr.responseText);

			var convertedEvent = convertDate(tempEvent);

			console.log(convertedEvent + "  after delete");

			eventList.push(convertedEvent);

			displayEventList(eventList);

		}
	}

	xhr.send();
};

var postUpdateOneEventFunction = function(event, callback) {

	event.preventDefault();

	console.log(" In update event");

	var id = document.updateForm.id.value;
	var title = document.updateForm.title.value;
	var description = document.updateForm.description.value;
	var amount = document.updateForm.amount.value;
	var category = document.updateForm.category.value;
	var eventdate = document.updateForm.eventdate.value;

	var newEvent = {};

	newEvent.id = id;

	newEvent.title = title;
	newEvent.description = description;
	newEvent.amount = amount;
	newEvent.category = category;
	newEvent.eventdate = new Date(eventdate);

	console.log(newEvent);

	var xhr = new XMLHttpRequest();

	xhr.open("POST", "rest/updateevent");

	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.send(JSON.stringify(newEvent));

	clearForms();

	xhr.onreadystatechange = function() {

		if (xhr.readyState === 4) {

			var eventList = [];

			var tempEvent = JSON.parse(xhr.responseText);

			var convertedEvent = convertDate(tempEvent);

			console.log(convertedEvent + " updated event");

			eventList.push(convertedEvent);

			displayEventList(eventList);

		}

	}

};

// -------------------------- Utility functions
// -----------------------------------------------------

// asynch GET method to call specific controller (based on url), get data from
// controller and call my callback function to display the results

var xhrMethod = function(callback, url) {
	var xhr = new XMLHttpRequest();

	xhr.open('GET', url);
	

	xhr.onreadystatechange = function() {
		console.log("IN ONREADY");
		if (xhr.readyState === 3) {
			console.log("State 3");
			clearForms();
		}
		if (xhr.readyState === 4) {
			var response = JSON.parse(xhr.responseText);
			console.log(response);
			console.log("my events above this");

			if (response.length > 1) {

				var output = [];

				for (var t = 0; t < response.length; t++) {

					/* response[t] = convertDate(response[t]); */

					output.push(convertDate(response[t]));

					console.log(output);

				}

				console.log("before ");

				console.log(output[0]);

				console.log("after ");

				callback(output);
			}

			else {

				var localArray = [];

				localArray.push(convertDate(response));

				console.log(localArray);
				console.log("my events above this");

				callback(localArray);
			}
		}

	};
    
    xhr.send();
};

// method to display results in a table

var displayEventList = function(eventsList) {

	createHomeButton();

	var body = document.getElementsByTagName('body');
	var table = document.createElement('table');
	table.setAttribute('id', 'tableList');
	var tbody = document.createElement('tbody');
	document.body.appendChild(table);
	table.appendChild(tbody);
	for (var i = 0; i < eventsList.length; i++) {
		if (i === 0) {
			var rowOne = document.createElement('tr');
			tbody.appendChild(rowOne);
			var keys = [];
			for ( var k in eventsList[i]) {
				var thead = document.createElement('th');
				rowOne.appendChild(thead);
				thead.innerHTML = k;
				keys.push(k);
			}
		}
		var row = document.createElement('tr');
		tbody.appendChild(row);

		for (var j = 0; j < keys.length; j++) {
			var tdata = document.createElement('td');
			row.appendChild(tdata);
			tdata.innerHTML = eventsList[i][keys[j]];
		}

	}

};

// method to clear forms initial forms

var clearForms = function() {
	var body = document.getElementsByTagName('body');
	var forms = document.getElementsByTagName('form');
	var integer = forms.length;
	for (var i = 0; i < integer; i++) {
		document.body.removeChild(forms[0]);
	}
};

// method to create home button and set it to call init method to rebuild the
// home page

var createHomeButton = function() {

	console.log("Inside create Home button")

	var body = document.querySelector("body");

	var form = document.createElement('form');
	var input = document.createElement('input');

	form.setAttribute("id", "home");

	input.setAttribute("type", "submit");

	input.setAttribute("value", "Home Button");

	input.addEventListener("click", init);

	form.appendChild(input);
	body.appendChild(form);

};


// method to create drop down

var createDropDown = function(eventsList) {

	console.log(" Inside createDropDown function");

	console.log(eventsList.length);

	console.log(eventsList);

	var localForm = document.myCategoryForm;

	var localSelect = localForm.category;

	for (var i = 0; i < eventsList.length; i++) {

		var option = document.createElement("option");

		var category = eventsList[i];

		option.innerHTML = category;

		localSelect.appendChild(option);

	}

	localForm.submit.addEventListener("click", getAllEventsByCategory);

};







// method to populate drop down

var loadDropDown = function() {

	console.log(" Inside loadDropDown function");

	console.log(createDropDown);

	var xhr = new XMLHttpRequest();

	xhr.open("GET", "rest/categories");

	xhr.onreadystatechange = function() {

		console.log(xhr.readyState);

		if (xhr.readyState == 4 && xhr.status < 400) {
			createDropDown(JSON.parse(xhr.responseText));

		}
	}
	xhr.send(null);

};



var convertDate = function(eventParam) {

	console.log("in convertDate method");

	var tempDate = eventParam.eventdate;

	var dateObj = new Date(tempDate);

	console.log(dateObj);

	eventParam.eventdate = dateObj;

	return eventParam;

};

// trying to populate the form to update form with info based on id

var functionToPopulateForm = function(event) {

	console.log(" in populate form");

	event.preventDefault(); // prevent redirect to another page

	var id = document.populateForm.eventForm.value; // grab id from the text box

	console.log(id);

	var url = "rest/event/" + id; // path to my controller

	var xhr = new XMLHttpRequest();

	xhr.open("GET", url);

	xhr.onreadystatechange = function() {

		if (xhr.readyState === 4) {

			var tempEvent = JSON.parse(xhr.responseText);

			var convertedEvent = convertDate(tempEvent);

			var id = convertedEvent.id;
			var title = convertedEvent.title;
			var description = convertedEvent.description;
			var amount = convertedEvent.amount;
			var category = convertedEvent.category;
			var eventdate = convertedEvent.eventdate;

			console.log(convertedEvent.title);

			var formID = document.getElementById("id");
			formID.setAttribute("value", id);

			var formTitle = document.getElementById("title");
			formTitle.setAttribute("value", title);

			var formDescription = document.getElementById("description");
			formDescription.setAttribute("value", description);

			var formAmount = document.getElementById("amount");
			formAmount.setAttribute("value", amount);

			var formCategory = document.getElementById("category");
			formCategory.setAttribute("value", category);

			var formDate = document.getElementById("eventdate");
			formDate.setAttribute("value", eventdate);

		}
	}

	xhr.send();

};

window.onload = function() { 
    
    console.log("in onload") 
    
    init(); // onload call init methods

    loadDropDown();                       
                           
};   
 