<script>
	export let href = '/None';
	export let title = 'None';
</script>

<div class="overflow-hidden px-2 py-2 relative group">
	<div
		class="absolute bottom-0 left-0 w-full h-1 bg-complementary-1 -translate-x-full group-hover:translate-x-0"
	/>
	<a {href} class="font-heading text-xl">{title}</a>
</div>
