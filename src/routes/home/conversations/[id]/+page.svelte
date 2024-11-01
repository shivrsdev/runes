<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';

	let {
		data
	}: {
		data: PageData;
	} = $props();
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
			{#if targetUsername}
				<button type="submit" class="ml-2 border p-2"> Add ➕ </button>
			{:else}
				<button type="submit" class="ml-2 border p-2" disabled> Add ➕ </button>
			{/if}
		</form>
	</div>

	<div
		bind:this={chatContainer}
		class="chat-container flex-grow overflow-y-auto p-4"
		style="max-height: calc(100vh - 160px);"
	>
		{#if data.messages}
			{#each data.messages as message}
				<div class="chat {data.user.id === message.user.id ? 'chat-end' : 'chat-start'}">
					<div class="chat-header">
						{message.user.username}
						<time class="text-xs opacity-50"
							>{new Date(message.createdAt).toLocaleTimeString()}</time
						>
						<div class="dropdown dropdown-top">
							<div tabindex="0" role="button" class="btn rounded-lg m-1 scale-75">
								...
							</div>
							<ul class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
								{#if message.user.id === data.user.id}
								<form action="?/deleteMessage" method="post">
									<input type="number" name="messageId" value={message.id} hidden>
									<button type="submit">
										Delete
									</button>
								</form>
								{:else}
								<form action="?/reportMessage" method="post">
									<input type="number" name="messageId" value={message.id} hidden>
									<button type="submit">
										Report
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

	<!-- Message Form -->
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
</main>
