import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const EventCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the server when the component mounts
    fetchEvents();
  }, []);

  useEffect(() => {
    // This effect will run whenever 'events' state is updated
    // You can perform any additional logic here
    console.log('Events updated:', events);
  }, [events]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3001/events');
      if (response.ok) {
        const fetchedEvents = await response.json();

        // Ensure that each event has 'id', 'title', and 'start' properties
        const formattedEvents = fetchedEvents.map((event) => ({
          id: event.id,
          title: event.title,
          start: event.event_date,
        }));
        setEvents(formattedEvents);
      } else {
        console.error('Failed to fetch events from the server');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDateSelect = async (arg) => {
    const title = prompt('Enter event title:');
    if (title) {
      try {
        const response = await fetch('http://localhost:3001/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title,
            event_date: arg.startStr,
          }),
        });

        if (response.ok) {
          const newEvent = await response.json();
          setEvents((prevEvents) => [...prevEvents, newEvent]);
          window.location.reload();
        } else {
          console.error('Failed to insert event on the server');
        }
      } catch (error) {
        console.error('Error during event insertion:', error);
      }
    }
  };

  const handleEventClick = async (info) => {
    const action = prompt('Do you want to delete or modify the event? (Type "delete" or "modify"):');

    if (action === 'delete') {
      const response = await fetch(`http://localhost:3001/events/${info.event.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedEvents = events.filter((event) => event.id !== info.event.id);
        setEvents(updatedEvents);
        window.location.reload();
      } else {
        console.error('Failed to delete event on the server');
      }
    } else if (action === 'modify') {
      const newTitle = prompt('Enter new event title:');
      if (newTitle) {
        const response = await fetch(`http://localhost:3001/events/${info.event.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newTitle,
          }),
        });

        if (response.ok) {
          const updatedEvents = events.map((event) =>
            event.id === info.event.id ? { ...event, title: newTitle } : event
          );

          setEvents(updatedEvents);
          window.location.reload();
        } else {
          console.error('Failed to update event on the server');
        }
      }
    }
  };

  const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'title',
      center: '',
      end: 'dayGridMonth,prev,next',
    },
    selectable: true,
    height: '100vh',
    select: handleDateSelect,
    events: events,
    eventClick: handleEventClick,
    displayEventTime: false,
    eventDisplay: 'block',
  };

  return (
    <div className='event_calendar'>
      <FullCalendar key={JSON.stringify(events)} {...calendarOptions} />
    </div>
  );
};

export default EventCalendar;
