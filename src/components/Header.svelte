<script>
	import { APP_NAME } from '../constants';
	import HeaderLink from './HeaderLink.svelte';
</script>

<header class=" px-16 py-6">
	<nav class=" flex flex-wrap items-center justify-between">
		<div class=" flex items-center">
			<a href="/" class=" font-fashion font-bold text-xl flex items-center">
				<img src="/logo.png" alt="Logo" class="w-16 h-16 mr-2 -translate-y-2" />
				{APP_NAME}
			</a>
		</div>

		<div class="hidden lg:block">
			<ul class="flex gap-6">
				<li>
					<HeaderLink href="/" title="About" />
				</li>
				<li>
					<HeaderLink href="/" title="Contact" />
				</li>
			</ul>
		</div>
	</nav>
</header>
