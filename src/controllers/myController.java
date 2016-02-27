
package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import data.Event;
import data.EventTrackerDAO;

@RestController
public class myController {

	@Autowired
	EventTrackerDAO eventTrackerDao;

	// get event by passing in id

	@RequestMapping(path = "event/{eventid}", method = RequestMethod.GET)

	public Event getEvent(@PathVariable("eventid") String eventId) {

		Event event = eventTrackerDao.getEventById(eventId);

		return event;
	}

	// get all event in a table

	@RequestMapping(path = "events", method = RequestMethod.GET)

	public List<Event> getAllEvents() {

		List<Event> allevents = eventTrackerDao.getAllEvents();

		return allevents;
	}

	// get all events by category

	@RequestMapping(path = "events/{category}", method = RequestMethod.GET)

	public List<Event> getEvents(@PathVariable("category") String category) {

		List<Event> eventList = eventTrackerDao.getAllEventsByCategory(category);

		return eventList;
	}

	// get all categories

	@RequestMapping(path = "categories", method = RequestMethod.GET)

	public List<Event> getCategories() {

		List<Event> eventList = eventTrackerDao.getAllCategories();

		System.out.println(eventList);

		return eventList;
	}

	// create new event with category

	@RequestMapping(path = "newevent", method = RequestMethod.PUT)

	public Event createEvent(@RequestBody Event event) {

		Event createdEvent = eventTrackerDao.createEvent(event);

		return createdEvent;
	}

	// delete event by id

	@RequestMapping(path = "deleteevent/{eventid}", method = RequestMethod.DELETE)

	public Event deleteEvent(@PathVariable("eventid") String eventid) {

		int eventID = Integer.parseInt(eventid);
		
		Event deletedEvent = eventTrackerDao.deleteEvent(eventID);

		return deletedEvent;
	}

	// update event by id

	@RequestMapping(path = "updateevent", method = RequestMethod.POST)

	public Event updateEvent(@RequestBody Event event) {

		Event updatedEvent = eventTrackerDao.updateEvent(event);

		return updatedEvent;
	}

}

