import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../../store/playlistAtom';
import useSpotify from '../../hooks/useSpotify';
import {
    LogoutIcon,
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    RssIcon,
} from '@heroicons/react/outline';

const Sidebar = () => {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            });
        }
    }, [session, spotifyApi]);

    console.log('Playlist ID: ', playlistId);

    return (
        <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll no-scrollbar h-screen hidden sm:max-w-[12rem] md:inline-flex lg:max-w-[15rem]">
            <div className="space-y-4">
                <button
                    className="flex items-center space-x-2 hover:text-white"
                    onClick={() => signOut()}
                >
                    <LogoutIcon className="h-5 w-5" />
                    <p>Log out</p>
                </button>
                <hr className="border-none" />

                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>
                <hr className="border-none" />
                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create Playlist</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5" />
                    <p>Liked Songs</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5" />
                    <p>Your Episodes</p>
                </button>
                <hr className="border-t-1 border-gray-900" />
                {/* Playlists */}
                {playlists &&
                    playlists.map((p) => (
                        <p
                            key={p.id}
                            className="cursor-pointer hover:text-white"
                            onClick={() => setPlaylistId(p.id)}
                        >
                            {p.name}
                        </p>
                    ))}
            </div>
        </div>
    );
};

export default Sidebar;
