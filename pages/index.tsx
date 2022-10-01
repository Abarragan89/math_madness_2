import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/homePage/index.module.css';
import useSound from 'use-sound';


function HomePage() {
    const [play] = useSound('/sounds/buttonClick.wav', {
        volume: .3
    })

    return (
        <>
            <Head>
                <title>Math Fact Missions</title>
            </Head>
            <main className={styles.homepageMain}>
                <h1>Math Fact Missions</h1>
                <Image className={styles.homePageImage} src="/rocketShip.png" width="350px" height="250px" alt="spaceship blasting off into space"></Image> <br />
                <Link href='/chooseGame' >
                    <button className={`mainButton ${styles.homePageBtn}`}
                        onClick={() => play()}
                    ><span>New Adventure</span></button>
                </Link><br />
                <Link href='/continueGame'>
                    <button
                        className={`mainButton ${styles.homePageBtn}`}
                        onClick={() => play()}
                    ><span>Continue</span></button>
                </Link>
            </main>
        </>
    )
}

export default HomePage