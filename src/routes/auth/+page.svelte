<script lang="ts">
	import { onMount } from 'svelte';
	import type { ActionData, PageData } from './$types';

	let { form, data }: { form: ActionData; data: PageData } = $props();

	onMount(() => {
		if (data.sessionToken) window.location.replace('/home');
	});
</script>

<main class="flex min-h-screen items-center justify-center bg-base-200">
	<form
		action="?/login"
		method="post"
		class="w-full max-w-sm space-y-4 rounded-lg bg-base-100 p-8 shadow-lg"
	>
		<h1 class="text-center text-3xl font-bold text-accent">Login</h1>

		{#if form?.message}
			<p class="text-center text-red-500">{form?.message}</p>
		{/if}

		<input type="text" name="username" placeholder="Username - nah.id.win" class="w-full" />

		<input type="email" name="email" placeholder="Email - nah.id.win@example.com" class="w-full" />

		<input
			type="password"
			name="password"
			placeholder="Password - mysecurepassword123$"
			class="w-full"
		/>

		<button type="submit" class="btn-primary mt-4 w-full">Login</button>

		<button formaction="?/register" class="btn-accent mt-2 w-full"> Sign up </button>
	</form>
</main>
