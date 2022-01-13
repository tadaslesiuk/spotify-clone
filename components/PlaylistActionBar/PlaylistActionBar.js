import { SearchIcon } from '@heroicons/react/outline';
import {
    PlayIcon,
    DownloadIcon,
    DotsHorizontalIcon,
} from '@heroicons/react/solid';

const PlaylistActionBar = () => {
    return (
        <div className="flex items-center justify-between p-6">
            <div className="flex items-center space-x-8">
                <PlayIcon className="w-16 h-16 text-[#1ED760]" />
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
