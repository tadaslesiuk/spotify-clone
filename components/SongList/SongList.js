import { useRecoilValue } from 'recoil';
import { playlistState } from '../../store/playlistAtom';

const SongList = () => {
    const playlist = useRecoilValue(playlistState);

    return (
        <div className="text-white">
            {playlist?.tracks?.items?.map((track) => (
                <div key={track.track.id}>{track.track.name}</div>
            ))}
        </div>
    );
};

export default SongList;
