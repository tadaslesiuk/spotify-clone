import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
    currentTrackIdState,
    trackIsPlayingState,
    trackPlaylistIdState,
} from '../../store/trackAtom';
import useSpotify from '../../hooks/useSpotify';
import { msToMinAndSec } from '../../lib/msToMinAndSec';
import { HeartIcon } from '@heroicons/react/outline';
import {
    PlayIcon,
    PauseIcon,
    DotsHorizontalIcon,
} from '@heroicons/react/solid';

const Song = ({ order, track, playlistId }) => {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] =
        useRecoilState(currentTrackIdState);
    const [trackIsPlaying, setTrackIsPlaying] =
        useRecoilState(trackIsPlayingState);
    const [trackPlaylistId, setTrackPlaylistId] =
        useRecoilState(trackPlaylistIdState);
    const [hovered, setHovered] = useState(false);

    const playHandler = () => {
        setCurrentTrackId(track?.track?.id);
        setTrackPlaylistId(playlistId);
        setTrackIsPlaying(true);
        spotifyApi.play({
            uris: [track?.track?.uri],
        });
    };

    const pauseHandler = () => {
        setTrackIsPlaying(false);
        spotifyApi.pause();
    };

    return (
        <div
            className="grid grid-cols-2 px-4 py-2 text-white text-opacity-60 hover:bg-[#212121] rounded cursor-default select-none"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onDoubleClick={playHandler}
        >
            <div className="flex items-center space-x-4">
                {!hovered ? (
                    trackIsPlaying && currentTrackId === track?.track?.id ? (
                        <PlayIcon className="w-6 h-6 text-[#1ED760] animate-pulse" />
                    ) : currentTrackId === track?.track?.id ? (
                        <p className="w-6 text-right pr-2 text-[#1ED760]">
                            {order + 1}
                        </p>
                    ) : (
                        <p className="w-6 text-right pr-2">{order + 1}</p>
                    )
                ) : trackIsPlaying && currentTrackId === track?.track?.id ? (
                    <PauseIcon className="w-6 h-6" onClick={pauseHandler} />
                ) : (
                    <PlayIcon className="w-6 h-6" onClick={playHandler} />
                )}
                <img
                    className="w-10 h-10"
                    src={track?.track?.album?.images?.[0]?.url}
                    alt=""
                />
                <div>
                    <p
                        className={`w-36 lg:w-64 truncate ${
                            (trackIsPlaying &&
                                currentTrackId === track?.track?.id) ||
                            currentTrackId === track?.track?.id
                                ? 'text-[#1ED760]'
                                : 'text-white'
                        }`}
                    >
                        {track?.track?.name}
                    </p>
                    <p
                        className={`w-36 lg:w-64 truncate ${
                            hovered && 'text-white'
                        } hover:underline hover:decoration-solid`}
                    >
                        {track?.track?.artists?.[0]?.name}
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p
                    className={`w-36 lg:w-64 truncate hidden md:inline ${
                        hovered && 'text-white'
                    }`}
                >
                    {track?.track?.album?.name}
                </p>
                <div className="grid grid-cols-3 items-center space-x-2">
                    <div className="flex justify-center">
                        {hovered && (
                            <HeartIcon className="w-4 h-4 hover:text-white" />
                        )}
                    </div>
                    <p>{msToMinAndSec(track?.track?.duration_ms)}</p>
                    <div className="flex justify-end">
                        {hovered && (
                            <DotsHorizontalIcon className="w-5 h-5 text-white" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Song;
