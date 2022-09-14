import Head from 'next/head'
import AdditionLobby from './additionLobby';
import { useRouter } from 'next/router';

function SubtractionLobby() {
  const router = useRouter();
  const { username, gameType } = router.query

  console.log('in subtraction Lobby ', username)
  console.log('in subtraction Lobby ', gameType)


  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AdditionLobby />
      </main>
    </div>
  )
}

export default SubtractionLobby;
