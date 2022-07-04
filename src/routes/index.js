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

export async function post({ request }) {
	try {
		console.log(Date.now());
		console.log(request.url);
		// console.log(request.url.href);

		console.log('contact index.js - CreateMessage');

		const messageData = await request.json();
		console.log(JSON.stringify(messageData)); // {"text":"123"}

		const createMessage = gql`
			mutation CreateMessage($messageData: Json!) {
				createMessage(data: $messageData) {
					id
					text
				}
			}
		`;

		const GRAPH_CMS_MESSAGE_TOKEN = process.env['GRAPH_CMS_MESSAGE_TOKEN'];
		console.log(GRAPH_CMS_MESSAGE_TOKEN);

		const headers = {
			authorization: `Bearer ${GRAPH_CMS_MESSAGE_TOKEN}`
		};

		const messageCreated = await client.request(
			createMessage,
			{ messageData: JSON.stringify(messageData) },
			headers
		);
		console.log(messageCreated);

		return {
			status: 200,
			body: {
				messageCreated
			}
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
