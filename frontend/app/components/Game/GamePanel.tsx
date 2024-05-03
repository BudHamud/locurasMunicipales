import styles from './game.module.css'

const GamePanel = ({ toggleCalendarView }) => {
  return (
    <section className={ styles.panel }>
      <button onClick={toggleCalendarView}>
        Calendario
      </button>
      <button>
        Acciones
      </button>
    </section>
  );
};

export default GamePanel;
