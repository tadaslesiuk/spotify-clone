import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../../store/playlistAtom';
import useSpotify from '../../hooks/useSpotify';
import {
    DotsHorizontalIcon,
    HomeIcon,
    SearchIcon,
    MenuAlt2Icon,
    PlusCircleIcon,
    HeartIcon,
} from '@heroicons/react/outline';

const Sidebar = () => {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState();
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists({ limit: 30 }).then((data) => {
                setPlaylists(data?.body?.items);
                setPlaylistId(data?.body?.items?.[0]?.id);
            });
        }
    }, [session, spotifyApi]);

    useEffect(() => {
        setSelectedPlaylist(playlists.find((p) => p.id === playlistId));
    }, [playlists, playlistId]);

    return (
        <div className="text-[#B3B3B3] p-5 text-sm border-r border-gray-900 overflow-y-scroll no-scrollbar h-screen hidden sm:max-w-[12rem] md:inline-flex lg:max-w-[15rem] cursor-default">
            <div className="space-y-3">
                <button className="hover:text-white cursor-default">
                    <DotsHorizontalIcon className="h-6 w-6" />
                </button>
                <button className="flex items-center space-x-2 hover:text-white cursor-default">
                    <HomeIcon className="h-6 w-6" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white cursor-default">
                    <SearchIcon className="h-6 w-6" />
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white cursor-default">
                    <MenuAlt2Icon className="h-6 w-6 -rotate-90" />
                    <p>Your Library</p>
                </button>
                <hr className="border-none" />
                <button className="flex items-center space-x-2 hover:text-white cursor-default">
                    <PlusCircleIcon className="6 w-6" />
                    <p>Create Playlist</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white cursor-default">
                    <HeartIcon className="h-6 w-6" />
                    <p>Liked Songs</p>
                </button>
                <hr className="border-t-1 border-gray-900" />
                <div className="space-y-3">
                    {playlists &&
                        playlists.map((p) => (
                            <p
                                key={p.id}
                                className={`hover:text-white ${
                                    p.id === selectedPlaylist?.id &&
                                    'text-white font-bold'
                                }`}
                                onClick={() => setPlaylistId(p.id)}
                            >
                                {p.name}
                            </p>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
