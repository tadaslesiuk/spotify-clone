import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import spotifyApi from '../lib/spotify';

const useSpotify = () => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session) {
            // If refresh token fails, initiate sign in flow
            if (session.error === 'RefreshAccessTokenError') {
                signIn();
            }

            spotifyApi.setAccessToken(session.user.accessToken);
        }
    }, [session]);

    return spotifyApi;
};

export default useSpotify;
