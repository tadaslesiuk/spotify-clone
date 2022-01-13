import { useEffect, useState } from 'react';
import useSpotify from '../../hooks/useSpotify';
import { msToMinAndSec } from '../../lib/msToMinAndSec';
import { PlayIcon } from '@heroicons/react/solid';

const Song = ({ order, track }) => {
    const spotifyApi = useSpotify();
    const [artists, setArtists] = useState('');
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const artistCount = track.track.artists.length;

        Object.values(track.track.artists).forEach((a, index) => {
            index !== artistCount - 1
                ? setArtists((state) => state + `${a.name}, `)
                : setArtists((state) => state + `${a.name}`);
        });
    }, []);

    return (
        <div
            className="grid grid-cols-2 px-4 text-white text-opacity-60 hover:bg-[#212121] rounded"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="flex items-center space-x-4">
                {!hovered ? (
                    <p className="w-6 text-right pr-2">{order + 1}</p>
                ) : (
                    <PlayIcon className="w-6 h-6" />
                )}
                <img
                    className="w-10 h-10"
                    src={track.track.album.images[0].url}
                    alt=""
                />
                <div>
                    <p className="w-36 lg:w-64 truncate text-white">
                        {track.track.name}
                    </p>
                    <p
                        className={`w-36 lg:w-64 truncate ${
                            hovered && 'text-white'
                        }`}
                    >
                        {artists}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p
                    className={`w-36 lg:w-64 truncate hidden md:inline ${
                        hovered && 'text-white'
                    }`}
                >
                    {track.track.album.name}
                </p>
                <p>{msToMinAndSec(track.track.duration_ms)}</p>
            </div>
        </div>
    );
};

export default Song;
