import type { IAppState } from '../stores/appStateStore';
import { appState } from '../stores/appStateStore';

export interface WebcamDeviceInfo {
	device_name: string;
	index: number;
	src: string;
}

export async function fetchAppState(): Promise<IAppState> {
	try {
		const response = await fetch(`${import.meta.env.VITE_BD_URL}/`);
		const return_json = await response.json();
		appState.set(return_json);
		return return_json;
	} catch (error) {
		console.error('Error fetching app state:', error);
		return { webcam_stared: false, stared_device_indices: [] };
	}
}

export async function fetchWebcamDeviceInfo(): Promise<WebcamDeviceInfo[]> {
	try {
		const response = await fetch(`${import.meta.env.VITE_BD_URL}/list-webcams`);
		let webcams = await response.json();
		webcams = webcams.map((webcam: any) => {
			webcam.src = `${import.meta.env.VITE_BD_URL}/get-stream/${webcam.index}`;
			return webcam;
		});

		await fetchAppState();
		return webcams;
	} catch (error) {
		console.error('Error fetching webcam device info:', error);
		return [];
	}
}

export async function fetchStartWebcams(device_indices: number[]): Promise<void> {
	try {
		const response = await fetch(`${import.meta.env.VITE_BD_URL}/start-webcams`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(device_indices)
		});

		await fetchAppState();
		return await response.json();
	} catch (error) {
		console.error('Error starting webcams:', error);
	}
}

export async function fetchStopWebcams(): Promise<void> {
	try {
		const response = await fetch(`${import.meta.env.VITE_BD_URL}/stop-webcams`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		await fetchAppState();
		return await response.json();
	} catch (error) {
		console.error('Error stopping webcams:', error);
	}
}
