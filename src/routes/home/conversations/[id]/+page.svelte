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

	onMount(() => {
		// Reload messages every 5 seconds
		setInterval(() => {
			invalidateAll();
		}, 5000);
	});
</script>

<main class="flex min-h-screen w-full flex-col">
	<div class="flex items-center justify-between p-4 shadow-xl">
		<h1 class="text-xl font-bold">{data.conversationName}</h1>
		<form action="?/addUser" method="post" class="flex">
			<input
				type="text"
				name="targetUsername"
				placeholder="User"
				bind:value={targetUsername}
				class="border p-2"
			/>
			<button type="submit" class="ml-2 border p-2" disabled={!targetUsername}>
				Add ➕
			</button>
		</form>
	</div>

	<div
		bind:this={chatContainer}
		class="chat-container flex-grow overflow-y-scroll p-4"
		style="max-height: calc(100vh - 160px);"
	>
		{#if data.messages}
			{#each data.messages as message}
				<div class="chat {data.user.id === message.user.id ? 'chat-end' : 'chat-start'}">
					<div class="chat-header flex justify-between items-center space-x-1">
						<span>{message.user.username}</span>
						<time class="text-xs opacity-50">
							{new Date(message.createdAt).toLocaleTimeString()}
						</time>
						<div class="dropdown relative">
							<button
								tabindex="0"
								class="btn rounded-lg m-1 scale-75"
								aria-label="Options"
							>
								...
							</button>
							<ul class="menu dropdown-content absolute right-0 z-[1] rounded-box bg-base-100 p-2 shadow">
								{#if message.user.id === data.user.id}
								<form action="?/deleteMessage" method="post" class="flex items-center">
									<input type="number" name="messageId" value={message.id} hidden>
									<button type="submit" class="text-red-600 hover:underline">
										Delete
									</button>
								</form>
								{:else}
								<form action="?/reportMessage" method="post" class="flex items-center">
									<input type="number" name="messageId" value={message.id} hidden>
									<button type="submit" class="text-blue-600 hover:underline">
										Report {message.reports.length}
									</button>
								</form>
								{/if}
							</ul>
						</div>
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
		<button type="submit" class="w-1/4 border p-2" disabled={!content}>
			Send 📨
		</button>
	</form>
</main>
