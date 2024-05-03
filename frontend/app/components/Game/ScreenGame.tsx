import { useState } from "react";
import styles from "./game.module.css";

const ScreenGame = () => {
  // Estado para controlar el estado del juego (tutorial, juego libre, etc.)
  const [gameState, setGameState] = useState("tutorial");

  // Función para avanzar al siguiente paso del tutorial
  const nextTutorialStep = () => {
    // Implementar la lógica para avanzar al siguiente paso del tutorial
    // Puedes actualizar el estado o realizar otras acciones según la etapa
  };

  return (
    <div className={styles.screenGame}>
      {gameState === "tutorial" && (
        <div className={styles.tutorial}>
          {/* Contenido del tutorial, incluyendo texto, imágenes y botones */}
          <img
            src="https://res.cloudinary.com/dcmic2snw/image/upload/v1714606090/locurasMonucipales/dipnxb4eu7xtwg9flqcw.png"
            alt="tutorial guy"
          />
          <div className={ styles.bubble }>
            <p>Bienvenido al juego! Aquí te explicaremos cómo funciona...</p>
            <button onClick={nextTutorialStep}>Siguiente paso</button>
          </div>
        </div>
      )}
      {gameState === "freePlay" && (
        <div className={styles.freePlay}>
          {/* Interfaces para interactuar con personajes, zonas, etc. */}
          <h2>¡Explora el juego y toma decisiones!</h2>
          {/* ... Interfaz del juego libre */}
        </div>
      )}
    </div>
  );
};

export default ScreenGame;
