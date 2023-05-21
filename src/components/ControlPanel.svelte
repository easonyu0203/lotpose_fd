<script lang="ts">
	import { onMount } from 'svelte';
	import {
		fetchWebcamDeviceInfo,
		fetchStartWebcams,
		fetchAppState,
		fetchStopWebcams
	} from '../utils/api_utils';
	import { appState } from '../stores/appStateStore';

	async function getWebcamInfo() {
		let webcams = await fetchWebcamDeviceInfo();
		const webcamNames: string[] = [];
		for (const device of await navigator.mediaDevices.enumerateDevices()) {
			if (device.kind === 'videoinput') {
				webcamNames.push(device.label || 'Unnamed Webcam');
			}
		}

		for (let index = 0; index < webcams.length; index++) {
			webcams[index].device_name = webcamNames[index];
		}

		return webcams;
	}

	let selectedIndices: number[] = [];
</script>

<div class="col-span-1 bg-gray-200">
	<h3
		class="mb-4 bg-dominat-2 h-12 font-bold text-amber-50 text-lg flex items-center justify-center"
	>
		Control Panel
	</h3>

	<div class="mx-4 flex flex-col gap-2">
		{#await getWebcamInfo()}
			<p>Loading webcams...</p>
		{:then webcams}
			{#if webcams.length > 0}
				<h4 class="mb-2 font-bold">Select Webcams:</h4>
				{#each webcams as webcam}
					<label class="flex items-center mb-2">
						<input
							type="checkbox"
							bind:group={selectedIndices}
							value={webcam.index}
							class="form-checkbox h-4 w-4 text-blue-500"
						/>
						<span class="ml-2">{webcam.device_name}</span>
					</label>
				{/each}
			{:else}
				<p>No webcams found.</p>
			{/if}
		{/await}

		{#if $appState.webcam_stared === false}
			<button
				class="bg-complementary-1 hover:bg-complementary-2 text-white font-bold py-2 px-4 rounded"
				on:click={() => fetchStartWebcams(selectedIndices)}
			>
				Start Webcams
			</button>
		{:else}
			<button
				class=" bg-orange-400 text-white font-bold py-2 px-4 rounded"
				on:click={async () => {
					$appState.stared_device_indices = [];
					$appState.webcam_stared = false;
					await fetchStopWebcams();
				}}
			>
				Stop Webcams
			</button>
		{/if}
	</div>
</div>
