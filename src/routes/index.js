import { client } from '$lib/graphql-client';
import { gql } from 'graphql-request';

// export async function get(request) {
// 	try {
// 		console.log(Date.now());
// 		console.log(request.url.href);
// 		console.log('contact index.js - GetMessages');

// 		const query = gql`
// 			query GetMessages {
// 				messages {
// 					id
// 					text
// 				}
// 			}
// 		`;

// 		const { messages } = await client.request(query);
// 		console.log(messages);

// 		return {
// 			status: 200,
// 			body: {
// 				messages
// 			}
// 		};
// 	} catch (error) {
// 		return {
// 			status: 500,
// 			body: {
// 				error: 'Server error : ' + error
// 			}
// 		};
// 	}
// }

// export async function post({ request }) {
export async function post() {
	// console.log(Date.now());
	// console.log(request.url);
	// console.log(request.url.href);

	// const messageData = await request.json();
	// console.log(messageData);

	// https://github.com/prisma-labs/graphql-request#passing-headers-in-each-request
	// https://github.com/prisma-labs/graphql-request#graphql-mutations
	const query = gql`
		mutation AddMessage($name: String!, $text: String!, $price: Int!) {
			createMessage(data: { name: $name, text: $text, price: $price }) {
				id
				name
				text
				price
			}
		}
	`;

	const variables = {
		name: 'Bob',
		text: 'GraphCMS Message Frontend',
		price: 52
	};
	console.log(variables);

	const GRAPH_CMS_MESSAGE_TOKEN = process.env['GRAPH_CMS_MESSAGE_TOKEN'];
	// console.log(GRAPH_CMS_MESSAGE_TOKEN);

	const requestHeaders = {
		authorization: 'Bearer ' + GRAPH_CMS_MESSAGE_TOKEN
	};
	// console.log(requestHeaders);

	try {
		// Overrides the clients headers with the passed values
		const data = await client.request(query, variables, requestHeaders);
		// console.log(data);
		console.log(JSON.stringify(data, undefined, 2));

		if (data) return { status: 200, body: data };
	} catch (error) {
		console.error(JSON.stringify(error, undefined, 2));
		return {
			status: 500,
			body: {
				error: 'Server error : ' + error
			}
		};
	}
}
