import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../../store/playlistAtom';
import {
    currentTrackIdState,
    trackIsPlayingState,
    trackPlaylistIdState,
} from '../../store/trackAtom';
import useSpotify from '../../hooks/useSpotify';
import { SearchIcon } from '@heroicons/react/outline';
import {
    PlayIcon,
    PauseIcon,
    DownloadIcon,
    DotsHorizontalIcon,
} from '@heroicons/react/solid';

const PlaylistActionBar = () => {
    const spotifyApi = useSpotify();
    const playlist = useRecoilValue(playlistState);
    const playlistId = useRecoilValue(playlistIdState);
    const [currentTrackId, setCurrentTrackId] =
        useRecoilState(currentTrackIdState);
    const [trackIsPlaying, setTrackIsPlaying] =
        useRecoilState(trackIsPlayingState);
    const [trackPlaylistId, setTrackPlaylistId] =
        useRecoilState(trackPlaylistIdState);

    // const playHandler = () => {
    //     if (playlist) {
    //         spotifyApi.getMyCurrentPlayingTrack().then((data) => {
    //             if (
    //                 playlist?.tracks?.items?.find(
    //                     (i) => i?.track?.id === data?.body?.item?.id
    //                 )
    //             ) {
    //                 setTrackIsPlaying(true);
    //                 spotifyApi.play();
    //             } else {
    //                 setCurrentTrackId(playlist?.tracks?.items?.[0]?.track?.id);
    //                 setTrackIsPlaying(true);
    //                 spotifyApi.play({
    //                     uris: [playlist?.tracks?.items?.[0]?.track?.uri],
    //                 });
    //             }
    //         });
    //     }
    // };

    // const pauseHandler = () => {
    //     spotifyApi.getMyCurrentPlaybackState().then((data) => {
    //         if (data?.body?.is_playing) {
    //             spotifyApi.pause();
    //             setTrackIsPlaying(false);
    //         }
    //     });
    // };

    // useEffect(() => {
    //     spotifyApi.getMyCurrentPlaybackState().then((data) => {
    //         if (data?.body?.is_playing) {
    //             setTrackPlaylistId(playlistId);
    //         }
    //         setTrackIsPlaying(data?.body?.is_playing);
    //     });
    // }, [spotifyApi, trackIsPlaying]);

    return (
        <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-8">
                {trackIsPlaying /* && playlistId === trackPlaylistId*/ ? (
                    <PauseIcon
                        className="w-16 h-16 text-[#1ED760] cursor-not-allowed"
                        // onClick={pauseHandler}
                    />
                ) : (
                    <PlayIcon
                        className="w-16 h-16 text-[#1ED760] cursor-not-allowed"
                        // onClick={playHandler}
                    />
                )}
                <DownloadIcon className="w-6 h-6 text-white text-opacity-60 hover:text-white" />
                <DotsHorizontalIcon className="w-6 h-6 text-white text-opacity-60 hover:text-white" />
            </div>
            <div className="pr-4">
                <SearchIcon className="w-8 h-8 text-white text-opacity-60 hover:bg-white/10 rounded-full p-2" />
            </div>
        </div>
    );
};

export default PlaylistActionBar;
