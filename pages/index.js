import Head from 'next/head';
import { getSession } from 'next-auth/react';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';

const Home = () => {
    return (
        <div className="bg-black h-screen overflow-hidden">
            <Head>
                <title>Spotify Clone</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex">
                <Sidebar />
                <div className="grow h-screen overflow-y-scroll no-scrollbar">
                    <Header />
                    <Main />
                </div>
            </main>

            <div>{/* Player */}</div>
        </div>
    );
};

export default Home;

export const getServerSideProps = async (context) => {
    const session = await getSession(context);

    return {
        props: {
            session,
        },
    };
};
