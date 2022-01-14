import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import {
    currentTrackIdState,
    trackIsPlayingState,
} from '../../store/trackAtom';
import useSpotify from '../../hooks/useSpotify';
import useTrackInfo from '../../hooks/useTrackInfo';
import {
    RefreshIcon,
    SwitchHorizontalIcon,
    VolumeUpIcon,
    VolumeOffIcon,
    ArrowsExpandIcon,
} from '@heroicons/react/outline';
import {
    RewindIcon,
    PlayIcon,
    PauseIcon,
    FastForwardIcon,
} from '@heroicons/react/solid';

const Player = () => {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] =
        useRecoilState(currentTrackIdState);
    const [trackIsPlaying, setTrackIsPlaying] =
        useRecoilState(trackIsPlayingState);
    const trackInfo = useTrackInfo();
    const [artists, setArtists] = useState('');
    const [volume, setVolume] = useState(50);

    console.log('TRACK INFO: ', trackInfo);

    const getCurrentTrack = () => {
        if (!trackInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                setCurrentTrackId(data?.body?.item.id);
            });
            spotifyApi.getMyCurrentPlaybackState().then((data) => {
                setTrackIsPlaying(data?.body?.is_playing);
            });
        }
    };

    const playbackHandler = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data?.body?.is_playing) {
                spotifyApi.pause();
                setTrackIsPlaying(false);
            } else {
                spotifyApi.play();
                setTrackIsPlaying(true);
            }
        });
    };

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            getCurrentTrack();
            setVolume(50);
        }
    }, [currentTrackIdState, session, spotifyApi]);

    useEffect(() => {
        if (trackInfo) {
            const artistCount = trackInfo.artists.length;

            if (artistCount === artists.split(', ').length) return;

            Object.values(trackInfo.artists).forEach((a, index) => {
                index !== artistCount - 1
                    ? setArtists((state) => state + `${a.name}, `)
                    : setArtists((state) => state + `${a.name}`);
            });
        }
    }, [trackInfo]);

    return (
        <div className="fixed grid grid-cols-3 w-full h-[90px] bottom-0 px-4 bg-[#181818] border-t border-white/10">
            <div className="flex justify-start items-center space-x-4">
                <img
                    className="w-14 h-14"
                    src={trackInfo?.album?.images?.[0]?.url}
                    alt=""
                />
                <div>
                    <p className="text-sm text-white">{trackInfo?.name}</p>
                    <p className="text-[11px] text-white text-opacity-60">
                        {artists}
                    </p>
                </div>
            </div>
            <div className="flex justify-center items-center space-x-4 text-white text-opacity-60">
                <SwitchHorizontalIcon className="w-4 h-4 hover:text-white" />
                <RewindIcon className="w-4 h-4 hover:text-white" />
                {trackIsPlaying ? (
                    <PauseIcon
                        className="w-10 h-10 text-white hover:scale-110 transition duration-100"
                        onClick={playbackHandler}
                    />
                ) : (
                    <PlayIcon
                        className="w-10 h-10 text-white hover:scale-110 transition duration-100"
                        onClick={playbackHandler}
                    />
                )}
                <FastForwardIcon className="w-4 h-4 hover:text-white" />
                <RefreshIcon className="w-4 h-4 hover:text-white" />
            </div>
            <div className="flex justify-end items-center space-x-2 text-white text-opacity-60">
                <VolumeUpIcon className="w-4 h-4 hover:text-white" />
                <input
                    className="w-[93px] h-[4px]"
                    type="range"
                    value={volume}
                    min={0}
                    max={100}
                    // onChange={}
                />
                <ArrowsExpandIcon className="w-4 h-4 hover:text-white" />
            </div>
        </div>
    );
};

export default Player;
