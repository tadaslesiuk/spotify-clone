import { useRecoilValue } from 'recoil';
import { playlistState } from '../../store/playlistAtom';
import PlaylistActionBar from '../PlaylistActionBar/PlaylistActionBar.js';
import SongListHeader from '../SongListHeader/SongListHeader.js';
import Song from '../Song/Song';

const SongList = () => {
    const playlist = useRecoilValue(playlistState);

    return (
        <>
            <PlaylistActionBar />
            <SongListHeader />
            <div className="flex flex-col space-y-2 px-8 py-4 text-white">
                {playlist?.tracks?.items?.map((track, index) => (
                    <Song key={track.track.id} order={index} track={track} />
                ))}
            </div>
        </>
    );
};

export default SongList;