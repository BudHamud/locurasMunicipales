import styles from './game.module.css'

const Day = ({ day, currentDay, advanceDay, events } : DayProps) => {
  
  const classes = `day ${day === currentDay ? 'current' : ''} ${events.length > 0 ? 'has-events' : ''}`;

  return (
    <div className={classes} onClick={() => advanceDay(day)}>
      <span>{day}</span>
      {/* Renderizar eventos para el día (si los hay) */}
      {events.map((event) => (
        <div className="event" key={event.id}>
          {event.title}
        </div>
      ))}
    </div>
  );
};

export default Day;