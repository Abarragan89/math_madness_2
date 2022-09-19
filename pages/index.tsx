import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/homePage/index.module.css';


function HomePage() {

    return (
        <main className={styles.homepageMain}>
            <h1>Math Missions</h1>
            <Image className={styles.homePageImage} src="/rocketShip.png" width="350px" height="250px" alt="spaceship blasting off into space"></Image> <br />
            <Link href='/chooseGame' >
                <button className={`mainButton ${styles.homePageBtn}`}
                onClick={() => stop()}
                ><span>New Adventure</span></button>
                </Link><br />
            <Link href='/continueGame'>
                <button
                    className={`mainButton ${styles.homePageBtn}`}
                ><span>Continue</span></button>
            </Link>
        </main>
    )
}

export default HomePage