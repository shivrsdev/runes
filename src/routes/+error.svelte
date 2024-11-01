<script lang="ts">
	import { page } from '$app/stores';
</script>

<main class="flex h-screen items-center justify-center">
	<div class="space-y-4 text-center">
		<h1 class="text-[44px]">Runes</h1>
		<h2 class="text-[22px]">{$page.status} {$page.error?.message}...</h2>
		<button on:click={() => window.location.replace('/')}> Return </button>
	</div>
</main>
