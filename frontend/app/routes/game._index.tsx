// import { json } from "@remix-run/react";
// import GamePanel from "../components/GamePanel";
// import LeaderSelection from "../components/LeaderSelection";
import Calendar from '../components/Game/Calendar';
import styles from '../css/routes.module.css'
import GamePanel from '../components/Game/GamePanel';
import { useState } from 'react';
import ScreenGame from '../components/Game/ScreenGame';
import { MetaFunction } from '@remix-run/node';

// const getUser = async () => {
//   const response = await fetch("http://localhost:8080/api/user");
//   console.log(response);
  
//   if (!response.ok) {
//     throw new Error("No se pudo cargar la informacion del usuario.");
//   }

//   const userData = await response.json();
  
//   return userData;
// };

// export const loader = async () => {
//   const user = await getUser();
//   return json(user);
// };

export const meta: MetaFunction = () => {
  return [
    { title: "Juego | Locuras Municipales" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const GameIndex = () => {
  // const user = useLoaderData<UserData>();

  const [showFullCalendar, setShowFullCalendar] = useState(false);

  const toggleCalendarView = () => {
    setShowFullCalendar(!showFullCalendar);
  };

  return (
    <main className={ styles.main }>
      <Calendar showFullCalendar={ showFullCalendar } />
      <GamePanel toggleCalendarView={ toggleCalendarView } />
      <ScreenGame />
    </main>
  );
};

export default GameIndex;
