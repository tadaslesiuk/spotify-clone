import { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistState } from '../../store/playlistAtom';
import {
    currentTrackIdState,
    trackIsPlayingState,
} from '../../store/trackAtom';
import useSpotify from '../../hooks/useSpotify';
import useTrackInfo from '../../hooks/useTrackInfo';
import { debounce } from 'lodash';
import {
    RefreshIcon,
    SwitchHorizontalIcon,
    VolumeUpIcon,
    VolumeOffIcon,
    ArrowsExpandIcon,
    HeartIcon,
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
    const playlist = useRecoilValue(playlistState);
    const [currentTrackId, setCurrentTrackId] =
        useRecoilState(currentTrackIdState);
    const [trackIsPlaying, setTrackIsPlaying] =
        useRecoilState(trackIsPlayingState);
    const trackInfo = useTrackInfo();
    const [volume, setVolume] = useState(20);
    const [volumeBeforeMute, setVolumeBeforeMute] = useState();

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

    const skipToPreviousHandler = () => {
        const currentTrackOrder = playlist?.tracks?.items?.findIndex(
            (track) => track?.track?.id === currentTrackId
        );

        if (playlist?.tracks?.items?.[currentTrackOrder - 1]) {
            const previousTrack =
                playlist?.tracks?.items?.[currentTrackOrder - 1]?.track;

            setCurrentTrackId(previousTrack?.id);
            setTrackIsPlaying(true);
            spotifyApi.play({
                uris: [previousTrack?.uri],
            });
        } else {
            const previousTrack =
                playlist?.tracks?.items?.[playlist?.tracks?.items?.length - 1]
                    ?.track;

            setCurrentTrackId(previousTrack?.id);
            setTrackIsPlaying(true);
            spotifyApi.play({
                uris: [previousTrack?.uri],
            });
        }
    };

    const skipToNextHandler = () => {
        const currentTrackOrder = playlist?.tracks?.items?.findIndex(
            (track) => track?.track?.id === currentTrackId
        );

        if (playlist?.tracks?.items?.[currentTrackOrder + 1]) {
            const nextTrack =
                playlist?.tracks?.items?.[currentTrackOrder + 1]?.track;

            setCurrentTrackId(nextTrack?.id);
            setTrackIsPlaying(true);
            spotifyApi.play({
                uris: [nextTrack?.uri],
            });
        } else {
            const nextTrack = playlist?.tracks?.items?.[0]?.track;

            setCurrentTrackId(nextTrack?.id);
            setTrackIsPlaying(true);
            spotifyApi.play({
                uris: [nextTrack?.uri],
            });
        }
    };

    const muteHandler = () => {
        setVolumeBeforeMute(volume);
        setVolume(0);
    };

    const unmuteHandler = () => {
        setVolume(volumeBeforeMute);
    };

    const debounceVolumeChange = useCallback(
        debounce((volume) => {
            spotifyApi
                .setVolume(volume)
                .catch((err) => console.error(err.message));
        }, 500),
        []
    );

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            getCurrentTrack();
            setVolume(50);
        }
    }, [currentTrackIdState, session, spotifyApi]);

    useEffect(() => {
        if (volume >= 0 && volume <= 100) {
            debounceVolumeChange(volume);
        }
    }, [volume]);

    return (
        <div className="fixed grid md:grid-cols-3 w-full h-[90px] bottom-0 px-4 bg-[#181818] border-t border-white/10">
            <div className="justify-start items-center space-x-4 hidden md:inline-flex">
                <img
                    className="w-14 h-14"
                    src={trackInfo?.album?.images?.[0]?.url}
                    alt=""
                />
                <div>
                    <p className="text-sm text-white hover:underline hover:decoration-solid cursor-not-allowed">
                        {trackInfo?.name}
                    </p>
                    <p className="text-[11px] text-white text-opacity-60 hover:underline hover:decoration-solid cursor-not-allowed">
                        {trackInfo?.artists?.[0]?.name}
                    </p>
                </div>
                {trackInfo && (
                    <HeartIcon className="w-5 h-5 text-white text-opacity-60 hover:text-white" />
                )}
            </div>
            <div className="flex justify-center items-center space-x-6 text-white text-opacity-80">
                <SwitchHorizontalIcon className="w-4 h-4 hover:text-white cursor-not-allowed" />
                <RewindIcon
                    className="w-4 h-4 hover:text-white"
                    onClick={skipToPreviousHandler}
                />
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
                <FastForwardIcon
                    className="w-4 h-4 hover:text-white"
                    onClick={skipToNextHandler}
                />
                <RefreshIcon className="w-4 h-4 hover:text-white cursor-not-allowed" />
            </div>
            <div className="justify-end hidden md:inline-flex items-center space-x-2 text-white text-opacity-60">
                {volume === 0 ? (
                    <VolumeOffIcon
                        className="w-4 h-4 hover:text-white"
                        onClick={unmuteHandler}
                    />
                ) : (
                    <VolumeUpIcon
                        className="w-4 h-4 hover:text-white"
                        onClick={muteHandler}
                    />
                )}
                <input
                    className="w-[93px] h-[4px]"
                    type="range"
                    value={volume}
                    min={0}
                    max={100}
                    onChange={(e) => setVolume(+e.target.value)}
                    style={{ background: '#A96B00' }}
                />
                <ArrowsExpandIcon className="w-4 h-4 hover:text-white cursor-not-allowed" />
            </div>
        </div>
    );
};

export default Player;
