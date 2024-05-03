import { useEffect, useState } from "react";
import Day from "./Day";
import styles from "./game.module.css";

const Calendar = ({ showFullCalendar }) => {
  const [currentDay, setCurrentDay] = useState(1);
  const [electionDate, setElectionDate] = useState(28);
  const [calendarSegment, setCalendarSegment] = useState(1);
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([]);

  useEffect(() => {
    const generatedEvents = generateAllEvents(); // Función para generar eventos para todos los días
    setCalendarEvents(generatedEvents);
  }, []);

  const generateAllEvents = () => {
    const events = [];

    for (let day = 1; day <= 28; day++) {
      const dayEvents = generateRandomEventsForDay();
      events.push({ day: day, events: dayEvents });
    }

    return events;
  };

  const generateRandomEventsForDay = () => {
    const dayEvents = []; // Array para almacenar los eventos del día

    // Generar eventos comunes
    const shouldGenerateCommonEvent = Math.random() < 0.3; // Probabilidad del 30%
    if (shouldGenerateCommonEvent) {
      const randomEventIndex = Math.floor(Math.random() * commonEvents.length);
      dayEvents.push(commonEvents[randomEventIndex]);
    }

    // Generar evento improbable (si el día no tiene evento común)
    if (dayEvents.length === 0) {
      const shouldGenerateRareEvent = Math.random() < 0.02; // Probabilidad del 2%
      if (shouldGenerateRareEvent) {
        const randomEventIndex = Math.floor(Math.random() * rareEvents.length);
        dayEvents.push(rareEvents[randomEventIndex]);
      }
    }

    return dayEvents;
  };

  const advanceDay = () => {
    if (currentDay >= electionDate) {
      setCurrentDay(1);
      setElectionDate(Math.floor(Math.random() * 28) + 1); // Nueva fecha aleatoria
    } else {
      setCurrentDay(currentDay + 1);
    }

    if (currentDay >= 21) {
      setCalendarSegment(4);
    } else if (currentDay >= 14) {
      setCalendarSegment(3);
    } else if (currentDay >= 7) {
      setCalendarSegment(2);
    } else {
      setCalendarSegment(1);
    }
  };

  const commonEvents = [
    { id: 1, title: "Lluvia" },
    { id: 2, title: "Mucho calor" },
    { id: 3, title: "Mucho Frio" },
    { id: 4, title: "Longchamps" },
    // ... otros eventos comunes
  ];

  const rareEvents = [
    { id: 10, title: "Invasión alienígena" },
    // ... otros eventos improbables
  ];

  return (
    <article className={styles.calendar}>
      {showFullCalendar
        ? calendarEvents.map((dayEvents) => (
            <Day
              key={dayEvents.day} // Usamos el día como key
              day={dayEvents.day}
              currentDay={currentDay}
              advanceDay={advanceDay}
              events={dayEvents.events} // Pasamos todos los eventos del día
            />
          ))
        : calendarEvents
            .slice((calendarSegment - 1) * 7, calendarSegment * 7)
            .map((dayEvents, dayIndex) => {
              const day = dayIndex + 1 + (calendarSegment - 1) * 7;

              return (
                <Day
                  key={dayEvents.day}
                  day={day}
                  currentDay={currentDay}
                  advanceDay={advanceDay}
                  events={dayEvents.events}  // Pasamos todos los eventos del día
                />
              );
            })}
    </article>
  );
};

export default Calendar;
