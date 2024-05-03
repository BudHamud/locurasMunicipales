import { useState, useEffect } from "react";

const GetGame = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      const response = await fetch("./leaders.json");
      console.log(response);
      
      if (!response.ok) {
        throw new Error("No se pudo cargar el juego, revisa la ruta api/game.json");
      }

      const data = await response.json();
      setLeaders(data);
    };

    fetchLeaders();
  }, []);

  return [leaders]; // Retorna los líderes del estado
};

export default GetGame;
