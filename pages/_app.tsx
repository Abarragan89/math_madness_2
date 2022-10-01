import '../styles/globals.css'
import { AppProvider } from '../AppContext'
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return <AppProvider>
    <Head>
      <title>Math Missions</title>
      <meta charSet='UTF-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta name="description" content='Test your math fact knowledge and play math games to improve math fact fluency. Great for educational settings. Users do not need to create any account and their progress is saved on their device.'/>
      <meta name='keywords' content='math, games, educational games, elementary, student, teacher, fluency, multiplication, addition, subtraction, division, facts, fact'
       />
      <link rel="icon" href="/favicon.ico" />
      <meta name='og:title' property='og:title' content='Math Missions' />
      <meta property="og:type" content="website" />
      <meta property="og:description" content="Test your math fact knowledge and play math games to improve math fact fluency. Great for educational settings. Users do not need to create any account and their progress is saved on their device." />
      {/* Finish this meta tag */}
      <meta property="og:image" content="/favicon.ico" />


    </Head>
    <Component {...pageProps} />
    </AppProvider>
}

export default MyApp
