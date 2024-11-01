<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: Snippet<[]>; data: LayoutData } = $props();
</script>

<main>
	<div class="drawer drawer-open">
		<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />

		<div class="drawer-content flex flex-col items-center justify-center">
			{@render children()}
		</div>

		<div class="drawer-side">
			<label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
			<ul class="menu min-h-full w-48 space-y-2 bg-base-200 p-4 text-base-content">
				{#if data.conversations}
					<form action="?/createConversation" method="post">
						<button type="submit" class="w-full"> Create conversation </button>
					</form>

					{#each data.conversations as conversation}
						<button
							onclick={() => window.location.replace(`/home/conversations/${conversation.id}`)}
						>
							{conversation.name}
						</button>
					{/each}
				{/if}
			</ul>
		</div>
	</div>
</main>
