import styles from '../css/comp.module.css'
import { Link } from '@remix-run/react';

const Header = () => {
    return (
        <header className={styles.header}>
          <nav>
          <img src='/icon.png' alt='logo' />
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </nav>
        </header>
    );
}

export default Header;
