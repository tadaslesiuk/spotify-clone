import Head from 'next/head';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';

const Home = () => {
    return (
        <div className='bg-black h-screen overflow-hidden'>
            <Head>
                <title>Spotify Clone</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className='flex'>
                <Sidebar />
                <div className='grow'>
                    <Header />
                    <Main />
                </div>
            </main>

            <div>{/* Player */}</div>
        </div>
    );
};

export default Home;
