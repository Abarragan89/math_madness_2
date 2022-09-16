import Link from 'next/link';
import styles from '../styles/headerStyles/headerStyles.module.css';
import { AiFillHome } from 'react-icons/ai'


function Header({ text, inGame }) {
    return (
        <header className={`flex-box-se ${styles.header}`}>

            <div>
                {inGame &&
                    <Link href='/'>
                        <p>
                            <AiFillHome />
                        </p>
                    </Link>
                }
            </div>
            <h1>{text}</h1>
            <div>
                {inGame &&
                    <Link href='#'>
                        <p>Quit</p>
                    </Link>
                }
            </div>
        </header>
    )
}

export default Header;

