<script>
	let text = 'Hello World';
	let payload;
	let payloadJSON;

	async function createMessage() {
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

			const { publishedMessage } = await response.json();
			console.log(publishedMessage);
			//
		} catch (error) {
			console.log('ERROR');
			console.log(error);
		}
	}
</script>

<h1 class="text-6xl">Contact Us Now</h1>

<input class="text-4xl" type="text" label="name" name="name" bind:value="{text}" />
<br />
<button class="text-4xl border-spacing-4" on:click="{() => createMessage()}">Create Message</button>
<hr />
