import { useEffect, useState } from 'react';
import { useNavigate } from '@remix-run/react';
import styles from '../css/comp.module.css';
import LeaderSelection from './LeaderSelection';
import { setUser } from '../hooks/setUser';

const Registration = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, leader: selectedLeader }),
      });
  
      if (!response.ok) {
        throw new Error('Error al crear el usuario');
      }
  
      const userData = await response.json(); 
      setUser(userData._id, userData)
  
      navigate(`/game/${userData._id}`);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      // Manejo de errores adecuado (p. ej. mostrar un mensaje de error al usuario)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/game');
        if (!response.ok) {
          throw new Error('No se pudo cargar el juego, revisa la ruta api/game.json');
        }
        const data = await response.json() as Leader[];
        setLeaders(data);
      } catch (error) {
        console.error('Error al cargar líderes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Registro de Usuario</h1>
      
      {isLoading && <p>Cargando líderes...</p>}

      {!isLoading && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="username">Nombre de Usuario:</label>
        <input type="text" id="username" value={name} onChange={(e) => setUsername(e.target.value)} required />

        <label htmlFor="email">Correo electrónico:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <LeaderSelection leaderId={ selectedLeader } setLeader={setSelectedLeader} leaders={leaders} />

          <button type="submit" className={styles.submitButton}>Registrarme</button>
        </form>
      )}
    </>
  );
};

export default Registration;