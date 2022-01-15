import { ClockIcon } from '@heroicons/react/outline';

const SongListHeader = () => {
    return (
        <div className="grid grid-cols-2 mx-8 px-4 py-2 text-white tracking-widest text-opacity-60 border-b border-white/10 cursor-default">
            <div className="flex items-center space-x-4">
                <p className="w-6 text-right pr-2">#</p>
                <div>
                    <p className="w-36 lg:w-64 truncate text-xs hover:text-white">
                        TITLE
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="w-36 lg:w-64 truncate text-xs hidden md:inline hover:text-white">
                    ALBUM
                </p>
                <ClockIcon className="w-4 h-4 hover:text-white" />
            </div>
        </div>
    );
};

export default SongListHeader;
