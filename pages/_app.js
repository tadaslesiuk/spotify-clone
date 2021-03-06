import '../styles/globals.scss';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
    return (
        <SessionProvider session={session}>
            <RecoilRoot>
                <Component {...pageProps} />
            </RecoilRoot>
        </SessionProvider>
    );
};

export default MyApp;
