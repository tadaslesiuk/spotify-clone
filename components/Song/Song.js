import { useEffect, useState } from 'react';
import useSpotify from '../../hooks/useSpotify';

const Song = ({ order, track }) => {
    const spotifyApi = useSpotify();
    const [artists, setArtists] = useState('');

    useEffect(() => {
        const artistCount = track.track.artists.length;

        Object.values(track.track.artists).forEach((a, index) => {
            index !== artistCount - 1
                ? setArtists((state) => state + `${a.name}, `)
                : setArtists((state) => state + `${a.name}`);
        });
    }, []);

    return (
        <div>
            <div>
                <p>{order + 1}</p>
                <img
                    className="w-10 h-10"
                    src={track.track.album.images[0].url}
                    alt=""
                />
                <div>
                    <p>{track.track.name}</p>
                    <p>{artists}</p>
                </div>
            </div>
        </div>
    );
};

export default Song;
