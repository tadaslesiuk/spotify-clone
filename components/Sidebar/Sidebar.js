import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState } from '../../store/playlistAtom';
import {
    trackIsPlayingState,
    trackPlaylistIdState,
} from '../../store/trackAtom';
import useSpotify from '../../hooks/useSpotify';
import {
    DotsHorizontalIcon,
    HomeIcon,
    SearchIcon,
    MenuAlt2Icon,
    VolumeUpIcon,
    UsersIcon,
} from '@heroicons/react/outline';
import { PlusCircleIcon, HeartIcon } from '@heroicons/react/solid';

import styles from './Sidebar.module.scss';

const Sidebar = () => {
    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState();
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    const trackPlaylistId = useRecoilValue(trackPlaylistIdState);
    const trackIsPlaying = useRecoilValue(trackIsPlayingState);

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
        <div className="flex-col text-[#B3B3B3] text-sm border-r border-gray-900 hidden md:inline-flex max-w-[14rem] cursor-default">
            <div className="px-2 pt-4 pb-1">
                <button className="pl-3 mb-2 text-white cursor-not-allowed">
                    <DotsHorizontalIcon className="h-6 w-6" />
                </button>
                <button className="flex items-center w-full h-10 px-3 space-x-4 hover:text-white cursor-not-allowed">
                    <HomeIcon className="h-5 w-5" />
                    <p className="font-bold">Home</p>
                </button>
                <button className="flex items-center w-full h-10 px-3 space-x-4 hover:text-white cursor-not-allowed">
                    <SearchIcon className="h-5 w-5" />
                    <p className="font-bold">Search</p>
                </button>
                <button className="flex items-center w-full h-10 px-3 space-x-4 hover:text-white cursor-not-allowed">
                    <MenuAlt2Icon className="h-5 w-5 -rotate-90" />
                    <p className="font-bold">Your Library</p>
                </button>
                <hr className="border-none my-2" />
                <button className="flex items-center w-full h-10 px-3 space-x-4 hover:text-white cursor-not-allowed">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p className="font-bold">Create Playlist</p>
                </button>
                <button className="flex items-center w-full h-10 px-3 space-x-4 hover:text-white cursor-not-allowed">
                    <HeartIcon className="h-5 w-5" />
                    <p className="font-bold">Liked Songs</p>
                </button>
            </div>
            <hr className="border-white/10 mx-5" />
            <div
                className={`px-5 py-3 space-y-3 ${styles['playlists-container']}`}
            >
                {playlists &&
                    playlists.map((p) => (
                        <div
                            className={`flex items-center justify-between ${styles['playlist']}`}
                        >
                            <p
                                key={p.id}
                                className={`hover:text-white ${
                                    p.id === selectedPlaylist?.id &&
                                    'text-white font-bold'
                                } truncate`}
                                onClick={() => setPlaylistId(p.id)}
                            >
                                {p.name}
                            </p>
                            {p.id === trackPlaylistId && trackIsPlaying ? (
                                <VolumeUpIcon className="w-3 h-3" />
                            ) : (
                                p.collaborative && (
                                    <UsersIcon className="w-3 h-3" />
                                )
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Sidebar;
