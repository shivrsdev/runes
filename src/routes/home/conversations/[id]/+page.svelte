<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';

	let { data }: { data: PageData } = $props();
	let content = $state('');
	let targetUsername = $state('');
	let chatContainer: HTMLDivElement;

	$effect(() => {
		if (chatContainer) {
			chatContainer.scrollTo({
				top: chatContainer.scrollHeight,
				behavior: 'smooth'
			});
		}
	});
</script>

<main class="flex min-h-screen w-full flex-col">
	<div
		bind:this={chatContainer}
		class="chat-container flex-grow overflow-y-auto p-4"
		style="max-height: calc(100vh - 80px);"
	>
		{#if data.messages}
			{#each data.messages as message}
				<div class="chat {data.user.id === message.user.id ? 'chat-end' : 'chat-start'}">
					<div class="chat-header">
						{message.user.username}
						<time class="text-xs opacity-50"
							>{new Date(message.createdAt).toLocaleTimeString()}</time
						>
					</div>
					<div class="chat-bubble">{message.content}</div>
				</div>
			{/each}
		{/if}
	</div>

	<form action="?/sendMessage" method="post" class="flex w-full p-2">
		<input
			type="text"
			name="content"
			placeholder="Message"
			class="flex-grow border p-2"
			bind:value={content}
		/>
		{#if content}
			<button type="submit" class="w-1/4 border p-2"> Send 📨 </button>
		{:else}
			<button type="submit" class="w-1/4 border p-2" disabled> Send 📨 </button>
		{/if}
	</form>

	<form action="?/addUser" method="post" class="flex w-full p-2">
		<input type="text" name="targetUsername" placeholder="User" bind:value={targetUsername} />
		{#if targetUsername}
			<button type="submit" class="w-1/4 border p-2"> Add ➕ </button>
		{:else}
			<button type="submit" class="w-1/4 border p-2" disabled> Add ➕ </button>
		{/if}
	</form>
</main>
