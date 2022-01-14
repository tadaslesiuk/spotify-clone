import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { currentTrackIdState } from '../store/trackAtom';
import useSpotify from './useSpotify';

const useTrackInfo = () => {
    const spotifyApi = useSpotify();
    const currentTrackId = useRecoilValue(currentTrackIdState);
    const [trackInfo, setTrackInfo] = useState(null);

    useEffect(() => {
        const getTrackInfo = async () => {
            if (currentTrackId) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrackId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                        },
                    }
                ).then((res) => res.json());

                setTrackInfo(trackInfo);
            }
        };
        getTrackInfo();
    }, [currentTrackId, spotifyApi]);

    return trackInfo;
};

export default useTrackInfo;
