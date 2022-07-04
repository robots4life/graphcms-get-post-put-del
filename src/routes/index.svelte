<script>
	// export const API_URL = process.env['JSON_PLACEHOLDER_ENDPOINT'];
	// console.log(API_URL);

	let text = 'Lorem Ipsum From Frontend.';
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
				// can be included, not a must
				headers: {
					'Content-Type': 'application/json'
				},
				body: payloadJSON
			});

			//
		} catch (error) {
			console.log('ERROR');
			console.log(error);
		}
	}

	export let data;
</script>

<h1 class="text-6xl">Contact Us Now</h1>

<input class="text-4xl" type="text" label="name" name="name" bind:value="{text}" />
<br />
<button class="text-4xl border-spacing-4" on:click="{() => createMessage()}">Create Message</button>
<hr />
{JSON.stringify(data, null, 2)}
