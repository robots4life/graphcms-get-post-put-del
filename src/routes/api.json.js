import { client } from '$lib/graphql-client';
import { gql } from 'graphql-request';

export async function get() {
	console.log('api.json');
	try {
		const getMessages = gql`
			query getMessages {
				messages(first: 1000) {
					id
					name
					text
					price
				}
			}
		`;
		// here messages HAS to be in an OBJECT and cannot later be put in an object when returned with the body
		const { messages } = await client.request(getMessages);
		console.log(messages);

		return {
			status: 200,
			// mind the difference between returning body: messages and body: { messages }
			body: messages
		};
	} catch (error) {
		return {
			status: 500,
			body: {
				error: 'Server error : ' + error
			}
		};
	}
}
