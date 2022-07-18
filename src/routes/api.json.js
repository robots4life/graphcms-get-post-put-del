import { client } from '$lib/graphql-client';
import { gql } from 'graphql-request';

export async function get() {
	console.log('api.json');

	// https://github.com/prisma-labs/graphql-request#error-handling
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
	try {
		const { messages } = await client.request(getMessages);
		// console.log(JSON.stringify(messages, undefined, 2));
		return {
			status: 200,
			body: messages
		};
	} catch (error) {
		console.error(JSON.stringify(error, undefined, 2));
		process.exit(1);
	}
}
