import { writable } from 'svelte/store';

export interface IAppState {
	webcam_stared: boolean;
	stared_device_indices: number[];
}

export const appState = writable<IAppState>({
	webcam_stared: false,
	stared_device_indices: []
});
