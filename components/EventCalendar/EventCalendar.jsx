import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import './EventCalendar.css'; // Import a CSS file for styling

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  

  useEffect(() => {
    // Fetch events from the server when the component mounts
    fetchEvents();
  }, []);

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

  const openModal = (arg) => {
    setSelectedDate(arg.startStr);
    setEventTitle('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    location.reload();
  };

  const handleDateSelect = async () => {
    if (eventTitle) {
      try {
        const response = await fetch('http://localhost:3001/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: eventTitle,
            event_date: selectedDate,
          }),
        });

        if (response.ok) {
          const newEvent = await response.json();
          setEvents((prevEvents) => [...prevEvents, newEvent]);
        } else {
          console.error('Failed to insert event on the server');
        }
      } catch (error) {
        console.error('Error during event insertion:', error);
      } finally {
        closeModal();
      }
    }
  };

  const handleEventUpdate = async (info, e) => {
    e.stopPropagation(); // Stop event propagation


    const newTitle = prompt('Enter new event title:');
    if (newTitle) {
      try {
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
          location.reload();

        } else {
          console.error('Failed to update event on the server');
        }
      } catch (error) {
        console.error('Error during event update:', error);
      }
    }
  };

  const handleEventDelete = async (info, e) => {
    e.stopPropagation(); // Stop event propagation
    
    const shouldDelete = window.confirm('Are you sure you want to delete this event?');
    if (!shouldDelete) {
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3001/events/${info.event.id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        const updatedEvents = events.filter((event) => event.id !== info.event.id);
        setEvents(updatedEvents);
        location.reload();
      } else {
        console.error('Failed to delete event on the server');
      }
    } catch (error) {
      console.error('Error during event deletion:', error);
    }
  };

  const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'prev',
      center: 'title',
      end: 'next',
    },
    selectable: true,
    height: '100vh',
    select: openModal,
    events: events,
    displayEventTime: false,
    eventDisplay: 'block',
    eventClick: handleEventUpdate,
    eventMouseEnter: (info) => (info.el.style.cursor = 'pointer'),
    eventMouseLeave: (info) => (info.el.style.cursor = ''),
    eventContent: (info) => {
      const deleteButton = document.createElement('span');
      deleteButton.innerHTML = ' &#x2716;';
      deleteButton.className = 'event-delete-button';
      deleteButton.addEventListener('click', (e) => handleEventDelete(info, e));
  
      const updateButton = document.createElement('span');
      updateButton.innerHTML = ' &#x270E;';
      updateButton.className = 'event-update-button';
      updateButton.addEventListener('click', (e) => handleEventUpdate(info, e));
  
      const titleContainer = document.createElement('div');
      titleContainer.className = 'event-title';
      titleContainer.innerHTML = `${info.event.title}`;
  
      const container = document.createElement('div');
      container.className = 'event-content-container';
      container.appendChild(titleContainer);
      container.appendChild(deleteButton);
      container.appendChild(updateButton);
  
      return { domNodes: [container] };
    },
  };

  return (
     <div className='event_calendar'>
      <FullCalendar key={JSON.stringify(events)} {...calendarOptions} />

      {/* Modal for date selection */}
      {isModalOpen && (
        <div className="custom-modal-overlay" onClick={closeModal}>
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            <p>Enter event title:</p>
            <input
              type="text"
              id="eventTitleInput"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
            <button onClick={handleDateSelect}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;
