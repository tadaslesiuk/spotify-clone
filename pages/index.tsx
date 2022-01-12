import Head from 'next/head';
import Sidebar from '../components/Sidebar/Sidebar';

const Home = () => {
    return (
        <div className='bg-black h-screen overflow-hidden'>
            <Head>
                <title>Spotify Clone</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main>
                <Sidebar />
                {/* Center */}
            </main>

            <div>{/* Player */}</div>
        </div>
    );
};

export default Home;
