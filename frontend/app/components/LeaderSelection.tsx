import styles from "../css/comp.module.css";
import { Dispatch, SetStateAction } from "react";

interface LeaderSelectionProps {
  setLeader: Dispatch<SetStateAction<Leader["_id"] | null>>;
  leaders: Leader[];
  leaderId: ObjectId | null;
}

const LeaderSelection = ({
  setLeader,
  leaders,
  leaderId,
}: LeaderSelectionProps) => {
  return (
    <>
      <h1>Elige tu líder político</h1>
      <section className={styles.game}>
        {leaders.map((leader: Leader) => (
          <div
            className={`${styles.card} ${
              leader._id === leaderId ? "" : styles.inactive
            }`}
            key={leader._id}
          >
            <h2>{leader.name}</h2>
            <img src={leader.img} alt={leader.name} />
            <p>Ideología: {leader.ideology}</p>
            <ul>
              <li>Dinero: {leader.stats.money}</li>
              <li>Corrupción: {leader.stats.corruption}</li>
              <li>Popularidad: {leader.stats.popularity}</li>
              <li>Influencia: {leader.stats.influence}</li>
              <li>Satisfacción: {leader.stats.satisfaction}</li>
              <li>Desempleo: {leader.stats.unemployment}</li>
              <li>Crimen: {leader.stats.crime}</li>
              <li>Salud: {leader.stats.health}</li>
              <li>Educación: {leader.stats.education}</li>
            </ul>
            <button onClick={() => setLeader(leader._id)}>Elegir líder</button>
          </div>
        ))}
      </section>
    </>
  );
};

export default LeaderSelection;
