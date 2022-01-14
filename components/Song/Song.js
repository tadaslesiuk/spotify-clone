import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
    currentTrackIdState,
    trackIsPlayingState,
} from '../../store/trackAtom';
import useSpotify from '../../hooks/useSpotify';
import { msToMinAndSec } from '../../lib/msToMinAndSec';
import { PlayIcon, PauseIcon } from '@heroicons/react/solid';

const Song = ({ order, track }) => {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] =
        useRecoilState(currentTrackIdState);
    const [trackIsPlaying, setTrackIsPlaying] =
        useRecoilState(trackIsPlayingState);
    const [artists, setArtists] = useState('');
    const [hovered, setHovered] = useState(false);

    const playHandler = () => {
        setCurrentTrackId(track.track.id);
        setTrackIsPlaying(true);
        spotifyApi.play({
            uris: [track.track.uri],
        });
    };

    useEffect(() => {
        const artistCount = track.track.artists.length;

        if (artistCount === artists.split(', ').length) return;

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
            onDoubleClick={playHandler}
        >
            <div className="flex items-center space-x-4">
                {!hovered ? (
                    trackIsPlaying && currentTrackId === track.track.id ? (
                        <PlayIcon className="w-6 h-6 text-[#1ED760] animate-pulse" />
                    ) : (
                        <p className="w-6 text-right pr-2">{order + 1}</p>
                    )
                ) : trackIsPlaying && currentTrackId === track.track.id ? (
                    <PauseIcon className="w-6 h-6" />
                ) : (
                    <PlayIcon className="w-6 h-6" />
                )}
                <img
                    className="w-10 h-10"
                    src={track.track.album.images[0].url}
                    alt=""
                />
                <div>
                    <p
                        className={`w-36 lg:w-64 truncate ${
                            trackIsPlaying && currentTrackId === track.track.id
                                ? 'text-[#1ED760]'
                                : 'text-white'
                        }`}
                    >
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
