import { atom } from 'recoil';

export const currentTrackIdState = atom({
    key: 'currentTrackIdState',
    default: null,
});

export const trackIsPlayingState = atom({
    key: 'trackIsPlayingState',
    default: false,
});

export const trackPlaylistIdState = atom({
    key: 'trackPlaylistIdState',
    default: null,
});
