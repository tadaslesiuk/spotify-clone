import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import useSpotify from '../../hooks/useSpotify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../../store/playlistAtom';
import { shuffle } from 'lodash';
import { ChevronDownIcon } from '@heroicons/react/outline';
// import {
//     ArrowCircleLeftIcon,
//     ArrowCircleRightIcon,
// } from '@heroicons/react/solid';

const colors = [
    'from-blue-500',
    'from-indigo-500',
    'from-purple-500',
    'from-pink-500',
    'from-red-500',
    'from-yellow-500',
    'from-green-500',
];

const Header = () => {
    const spotifyApi = useSpotify();
    const { data: session } = useSession();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState); // Read-only state value
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    useEffect(() => {
        setColor(shuffle(colors).shift());
    }, [playlistId]);

    useEffect(() => {
        spotifyApi
            .getPlaylist(playlistId)
            .then((data) => {
                setPlaylist(data.body);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }, [spotifyApi, playlistId]);

    console.log(playlist);

    return (
        <>
            <header className="absolute top-5 right-8">
                {/* <div className='flex'>
                    <ArrowCircleLeftIcon className='w-8 h-8 cursor-pointer' />
                    <ArrowCircleRightIcon className='w-8 h-8 cursor-pointer' />
                </div> */}
                <div className="flex items-center w-max rounded-full bg-black/80 text-white space-x-2 p-0.5 pr-2 hover:bg-black/60 cursor-pointer">
                    <img
                        className="rounded-full w-7 h-7"
                        src={session?.user.image}
                        alt=""
                    />
                    <span>{session?.user.name}</span>
                    <ChevronDownIcon className="w-4 h-4" />
                </div>
            </header>
            <div
                className={`flex items-end h-80 space-x-7 text-white p-8 bg-gradient-to-b ${color} to-black`}
            >
                <img
                    className="w-48 h-48 shadow-2xl"
                    src={playlist?.images?.[0]?.url}
                    alt=""
                />
                <div>
                    <p className="text-xs font-bold">PLAYLIST</p>
                    <h1 className="text-8xl font-bold">{playlist?.name}</h1>
                </div>
            </div>
        </>
    );
};

export default Header;
