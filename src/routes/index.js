import { client } from '$lib/graphql-client';
import { gql } from 'graphql-request';

const GRAPH_CMS_MESSAGE_TOKEN = process.env['GRAPH_CMS_MESSAGE_TOKEN'];
const requestHeaders = { authorization: 'Bearer ' + GRAPH_CMS_MESSAGE_TOKEN };

export async function get() {
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
		const messages = await client.request(getMessages);
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

export async function post() {
	const variables = {
		name: 'Jane',
		text: '24',
		price: Date.now()
	};

	const createMessage = gql`
		mutation createMessage($name: String!, $text: String!, $price: Int!) {
			createMessage(data: { name: $name, text: $text, price: $price }) {
				id
				name
				text
				price
			}
		}
	`;

	const publishMessage = gql`
		mutation publishMessage($id: ID!) {
			publishMessage(where: { id: $id }, to: PUBLISHED) {
				id
			}
		}
	`;

	// https://github.com/prisma-labs/graphql-request#error-handling

	try {
		const createdMessage = await client.request(createMessage, variables, requestHeaders);
		// console.log(JSON.stringify(createdMessage, undefined, 2));

		try {
			const messageID = { id: createdMessage.createMessage.id };
			const publishedMessage = await client.request(
				publishMessage,
				messageID,
				requestHeaders
			);
			let returnedMessage = JSON.stringify(publishedMessage);
			// console.log(returnedMessage);
			return {
				status: 200
			};
		} catch (error) {
			console.error(JSON.stringify(error, undefined, 2));
			process.exit(1);
		}
	} catch (error) {
		console.error(JSON.stringify(error, undefined, 2));
		process.exit(1);
	}
}
