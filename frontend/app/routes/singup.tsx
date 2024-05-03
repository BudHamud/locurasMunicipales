import { MetaFunction } from '@remix-run/node';
import Registration from '../components/Registration'
import styles from '../css/routes.module.css'

export const meta: MetaFunction = () => {
  return [
    { title: "Registro | Locuras Municipales" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Singup() {
  return (
    <main className={ styles.main }>
    <Registration />
    </main>
  )
}
