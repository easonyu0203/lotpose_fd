<script lang="ts">
	import { onMount } from 'svelte';
	// import {fetchWebcamDeviceInfo, WebcamDeviceInfo} from "../utils/api_utils";
	import ControlPanel from '../components/ControlPanel.svelte';
	import type { WebcamDeviceInfo } from '../utils/api_utils';
	import { appState } from '../stores/appStateStore';

	let source_urls: Array<null | string> = [null, null, null, null];

	$: {
		for (let idx = 0; idx < $appState.stared_device_indices.length; idx++) {
			let webcam_idx = $appState.stared_device_indices[idx];
			source_urls[idx] = `${import.meta.env.VITE_BD_URL}/get-stream/${webcam_idx}`;
		}
		for (let idx = $appState.stared_device_indices.length; idx < 4; idx++) {
			source_urls[idx] = null;
		}
	}
</script>

<div class=" flex-1 grid grid-cols-5 gap-4 m-3">
	<!-- left control panel -->
	<ControlPanel />

	<!-- right display panel -->
	<div class=" col-span-4 grid grid-cols-2 grid-rows-2 gap-2">
		<!-- Video elements -->
		{#each source_urls as src}
			<div class=" bg-gray-300 rounded">
				{#if src}
					<img {src} alt="webcam" class="w-full h-full object-cover rounded" />
				{:else}
					<div class="flex items-center justify-center h-full">
						<p class="text-gray-500">No video source available</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
