
package data;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;
import data.Event;

@Transactional

public class EventTrackerDAO {

	@PersistenceContext

	private EntityManager em;

	public Event getEventById(String eventid) {

		int id = Integer.parseInt(eventid.trim());

		Event event = em.find(Event.class, id);

		System.out.println(event);

		return event;

	}

	public List<Event> getAllEvents() {

		List<Event> events = em.createNamedQuery("Event.getAllEvents").getResultList();

		return events;

	}

	public List<Event> getAllCategories() {

		List<Event> events = em.createNamedQuery("Event.getAllCategories").getResultList();

		return events;

	}

	public List<Event> getAllEventsByCategory(String category) {

		List<Event> eventByCategory = em.createNamedQuery("Event.getEventByCategory").setParameter("category", category)
				.getResultList();

		return eventByCategory;

	}

	public Event createEvent(Event e) {

		e.setEventdate(new Date());

		em.merge(e);

		em.persist(e);

		Event persistedEvent = (Event) em.createNamedQuery("Event.getLastEventById").getSingleResult();

		return persistedEvent;

	}

	public Event deleteEvent(int id) {

		Event e = em.find(Event.class, id);

		em.remove(e);

		return e;

	}

	public Event updateEvent(Event e) {

		em.merge(e);

		//em.persist(e);

		int id = e.getId();

		Event persistedEvent = em.find(Event.class, id);

		return persistedEvent;

	}

}
