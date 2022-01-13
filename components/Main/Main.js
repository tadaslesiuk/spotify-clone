import PlaylistDetails from '../PlaylistDetails/PlaylistDetails';
import SongList from '../SongList/SongList';

const Main = () => {
    return (
        <div className="text-white bg-transparent bg-gradient-to-t from-[#121212]">
            <PlaylistDetails />
            <SongList />
        </div>
    );
};

export default Main;
