import '../styles/globals.css';
import { AppProvider } from '../AppContext';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {

  return <AppProvider>
    <Head>
      <title>Math Missions</title>
      <meta charSet='UTF-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <meta name="description" content='Test your math fact knowledge and play math games to improve math fact fluency. Great for educational settings. Users do not need to create any account and their progress is saved on their device.' />
      <meta name='keywords' content='math fact missions, math, games, educational games, elementary, student, teacher, fluency, multiplication, addition, subtraction, division, facts, fact'
      />
      <meta name='og:title' property='og:title' content='Math Missions' />
      <meta property="og:type" content="website" />
      <meta property="og:description" content="Test your math fact knowledge and play math games to improve math fact fluency. Great for educational settings. Users do not need to create any account and their progress is saved on their device." />
      <meta property="og:image" content="/favicon.ico" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <Component {...pageProps} />
  </AppProvider>
}

export default MyApp
