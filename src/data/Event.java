
package data;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "Events")

@NamedQueries({

		@NamedQuery(name = "Event.getEventByCategory", query = "select e from Event e where e.category = :category"),
		@NamedQuery(name = "Event.getLastEventById", query = "select e from Event e where e.id = (SELECT MAX(e2.id)from Event e2)"),
		@NamedQuery(name = "Event.getAllEvents", query = "select e from Event e"),
		@NamedQuery(name = "Event.getAllCategories", query = "select distinct e.category from Event e") })

public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "eventid")
	private int id;

	@Column(name = "name")
	private String title;
	private String description;
	private double amount;
	private String category;
	private Date eventdate;

	public Event() {
	}

	public Event(int id, String title, String description, double amount, String category, Date eventdate) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.amount = amount;
		this.category = category;
		this.eventdate = eventdate;
	}

	public int getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	public double getAmount() {
		return amount;
	}

	public String getCategory() {
		return category;
	}

	public Date getEventdate() {
		return eventdate;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public void setEventdate(Date eventdate) {
		this.eventdate = eventdate;
	}

	@Override
	public String toString() {
		return "Event [id=" + id + ", title=" + title + ", description=" + description + ", amount=" + amount
				+ ", category=" + category + ", eventdate=" + eventdate + "]";
	}

}
