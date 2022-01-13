import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistState } from '../../store/playlistAtom';
import {
    currentTrackIdState,
    trackIsPlayingState,
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
    const [currentTrackId, setCurrentTrackId] =
        useRecoilState(currentTrackIdState);
    const [trackIsPlaying, setTrackIsPlaying] =
        useRecoilState(trackIsPlayingState);

    const playHandler = () => {
        if (playlist) {
            setCurrentTrackId(currentTrackId);
            setTrackIsPlaying(true);
            spotifyApi.play({
                uris: [playlist.tracks.items[0].track.uri],
            });
        }
    };

    return (
        <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-8">
                {trackIsPlaying ? (
                    <PauseIcon className="w-16 h-16 text-[#1ED760]" />
                ) : (
                    <PlayIcon
                        className="w-16 h-16 text-[#1ED760]"
                        onClick={playHandler}
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
