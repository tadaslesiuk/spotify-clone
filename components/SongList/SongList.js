import { useRecoilValue } from 'recoil';
import { playlistState } from '../../store/playlistAtom';
import Song from '../Song/Song';

const SongList = () => {
    const playlist = useRecoilValue(playlistState);

    return (
        <div className="flex flex-col space-y-1 px-8 pb-28 text-white">
            {playlist?.tracks?.items?.map((track, index) => (
                <Song key={track.track.id} order={index} track={track} />
            ))}
        </div>
    );
};

export default SongList;
