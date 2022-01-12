import { useEffect, useState } from 'react';
import useSpotify from '../../hooks/useSpotify';
import { msToMinAndSec } from '../../lib/msToMinAndSec';

const Song = ({ order, track }) => {
    const spotifyApi = useSpotify();
    const [artists, setArtists] = useState('');
    console.log(track.track);

    useEffect(() => {
        const artistCount = track.track.artists.length;

        Object.values(track.track.artists).forEach((a, index) => {
            index !== artistCount - 1
                ? setArtists((state) => state + `${a.name}, `)
                : setArtists((state) => state + `${a.name}`);
        });
    }, []);

    return (
        <div className="grid grid-cols-2">
            <div className="flex items-center space-x-4">
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
            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="hidden md:inline">{track.track.album.name}</p>
                <p>{msToMinAndSec(track.track.duration_ms)}</p>
            </div>
        </div>
    );
};

export default Song;
