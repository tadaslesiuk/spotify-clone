import { atom } from 'recoil';

export const playlistState = atom({
    key: 'playlistState',
    default: null,
});

export const playlistIdState = atom({
    key: 'playlistIdState',
    default: null,
});

export const playlistOwnerState = atom({
    key: 'playlistOwnerState',
    default: null,
});

export const playlistOwnerIdState = atom({
    key: 'playlistOwnerIdState',
    default: null,
});
