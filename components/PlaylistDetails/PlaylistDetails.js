import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSpotify from '../../hooks/useSpotify';
import {
    playlistIdState,
    playlistOwnerIdState,
    playlistOwnerState,
    playlistState,
} from '../../store/playlistAtom';
import { shuffle } from 'lodash';

const colors = [
    'from-blue-500',
    'from-indigo-500',
    'from-purple-500',
    'from-pink-500',
    'from-red-500',
    'from-yellow-500',
    'from-green-500',
];

const PlaylistDetails = () => {
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState); // Read-only state value
    const [playlist, setPlaylist] = useRecoilState(playlistState);
    const [playlistOwnerId, setPlaylistOwnerId] =
        useRecoilState(playlistOwnerIdState);
    const [playlistOwner, setPlaylistOwner] =
        useRecoilState(playlistOwnerState);

    console.log(playlistOwner);

    useEffect(() => {
        setColor(shuffle(colors).shift());
    }, [playlistId]);

    useEffect(() => {
        spotifyApi
            .getPlaylist(playlistId)
            .then((data) => {
                setPlaylist(data.body);
                setPlaylistOwnerId(data.body.owner.id);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }, [spotifyApi, playlistId]);

    useEffect(() => {
        spotifyApi
            .getUser(playlistOwnerId)
            .then((data) => {
                setPlaylistOwner(data.body);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }, [spotifyApi, playlistOwnerId]);

    console.log(playlist);

    return (
        <div
            className={`flex items-end h-80 space-x-7 text-white p-8 bg-gradient-to-b ${color} to-black`}
        >
            <img
                className="w-56 h-56 shadow-2xl hover:opacity-80"
                src={playlist?.images?.[0]?.url}
                alt=""
            />
            <div>
                <p className="text-xs font-bold">PLAYLIST</p>
                <h1 className="text-8xl font-bold mt-2 mb-6 cursor-pointer">
                    {playlist?.name}
                </h1>
                <p className="text-sm text-white text-opacity-60 mb-2 cursor-pointer">
                    {playlist?.description}
                </p>
                <div className="flex items-center w-max rounded-full text-white text-opacity-60 text-sm space-x-2">
                    <img
                        className="rounded-full w-6 h-6"
                        src={playlistOwner?.images[0].url}
                        alt=""
                    />
                    <span className="text-white font-bold hover:underline cursor-pointer">
                        {playlistOwner?.display_name}
                    </span>
                    <div className="text-lg">•</div>
                    <div>
                        {`${playlist?.followers.total} ${
                            playlist?.followers.total.toString().endsWith('1')
                                ? 'like'
                                : 'likes'
                        }`}
                    </div>
                    <div className="text-lg">•</div>
                    <div>{`${playlist?.tracks.total} ${
                        playlist?.tracks.total.toString().endsWith('1')
                            ? 'song'
                            : 'songs'
                    }`}</div>
                </div>
            </div>
        </div>
    );
};

export default PlaylistDetails;
