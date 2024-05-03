import type { MetaFunction } from "@remix-run/node";
import styles from "../css/routes.module.css";
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Inicio | Locuras Municipales" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const navigate = useNavigate()

  return (
    <main className={styles.main}>
      <h1>Locuras Municipales</h1>
      <section className={styles.content}>
        <h3>
          Un mundo en tus manos: Conviértete en el presidente y forja el destino
          de tu nación
        </h3>
        <p>
          <span>En este juego de gestión de presidente, asumes el control de una
          nación en desarrollo.</span> Tu objetivo principal es guiar a tu pueblo hacia
          un futuro próspero y armonioso. Para lograrlo, deberás tomar
          decisiones cruciales en diversos ámbitos, desde la economía y la
          educación hasta la política exterior y la defensa nacional.
        </p>
        <p>
          <span>Cada acción que tomes tendrá un impacto significativo en la vida de
          tus ciudadanos.</span> Deberás sopesar cuidadosamente las consecuencias de
          tus decisiones, ya que pueden generar tanto eventos positivos como
          negativos. Por ejemplo, invertir en educación puede mejorar la calidad
          de vida de tu población a largo plazo, pero a corto plazo puede
          requerir recortes en otros sectores.
        </p>
        <p>
          <span>Tu capacidad para gestionar estos desafíos y tomar decisiones
          acertadas determinará el éxito de tu mandato.</span> ¿Podrás convertirte en
          un líder visionario que lleve a tu nación a la grandeza? ¿O tus
          decisiones te llevarán por un camino hacia la ruina?
        </p>
        <p>
          <span>Prepárate para enfrentar dilemas morales, desafíos económicos y crisis
          políticas en este juego que pondrá a prueba tus habilidades de
          liderazgo y estrategia.</span> ¡El futuro de tu nación está en tus manos!
        </p>
      </section>
      <h2>¿A qué esperas para comenzar a escribir tu propia historia?</h2>
      <button onClick={() => navigate("/singup")}>Comenzar</button>
    </main>
  );
}
