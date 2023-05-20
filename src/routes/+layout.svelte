<script>
	import '../app.css';
	import Header from '../components/Header.svelte';
</script>

<div id="main_container" class=" w-screen min-h-screen bg-base flex flex-col">
	<Header />
	<slot />
</div>
