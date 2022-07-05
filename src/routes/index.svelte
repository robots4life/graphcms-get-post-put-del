<script>
	let text = 'Hello World';
	let payload;
	let payloadJSON;

	let cursorWait = false;

	async function createMessage() {
		cursorWait = true;
		document.body.classList.add('cursorWait');

		console.log(text);

		payload = {
			text
		};
		// stringify the payload
		payloadJSON = JSON.stringify(payload);
		console.log(payloadJSON);

		try {
			const response = await fetch('/', {
				method: 'POST',
				//
				headers: {
					'Content-Type': 'application/json'
				},
				body: payloadJSON
			});

			// The HTML response
			const publishedMessage = await response.text();
			// console.log(publishedMessage);
			//
			getMessages();
			//
		} catch (error) {
			console.log('ERROR');
			console.log(error);
		}
	}

	async function getMessages() {
		try {
			const url = '/api.json';
			const response = await fetch(url);
			const latestMessages = await response.json();
			messages = latestMessages;
			//
			cursorWait = false;
			document.body.classList.remove('cursorWait');
		} catch (error) {
			console.log('ERROR');
			console.log(error);
		}
	}
	export let messages;

	function clickedOnBody() {
		console.log('You just clicked on the body element..');
	}
</script>

<!-- https://github.com/sveltejs/svelte/issues/3105 -->
<!-- <svelte:body class:cursorWait /> -->
<svelte:head>
	{#if cursorWait}
		<style>
			body {
				cursor: wait;
			}
		</style>
	{/if}
</svelte:head>

<h1 class="text-6xl">Contact Us Now</h1>

<input
	class="text-4xl"
	class:cursorWait
	disabled="{cursorWait}"
	type="text"
	label="name"
	name="name"
	bind:value="{text}"
/>
<hr />
<button
	class="text-4xl border-spacing-4"
	class:cursorWait
	disabled="{cursorWait}"
	on:click="{() => createMessage()}">Create Message</button
>
<hr />

<!-- {JSON.stringify(messages, null, 2)} -->

{#each messages as message, index}
	<p>{index} : {message.id}</p>
	<p>{message.name}</p>
	<p>{message.text}</p>
	<p>{message.price}</p>
	<hr />
{/each}

<style>
	.cursorWait {
		cursor: wait;
	}
</style>
