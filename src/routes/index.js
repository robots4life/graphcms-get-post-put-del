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
		console.log(messages);

		return {
			status: 200,
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

export async function post() {
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
	const variables = {
		name: 'Simon',
		text: '36',
		price: Date.now()
	};
	try {
		const createdMessage = await client.request(createMessage, variables, requestHeaders);
		const publishMessage = gql`
			mutation publishMessage($id: ID!) {
				publishMessage(where: { id: $id }, to: PUBLISHED) {
					id
				}
			}
		`;
		const messageID = { id: createdMessage.createMessage.id };
		const publishedMessage = await client.request(publishMessage, messageID, requestHeaders);
		let returnedMessage = JSON.stringify(publishedMessage);
		// console.log(returnedMessage);

		return {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			},
			// mind the difference between returning body: returnedMessage and body: { returnedMessage }
			// Body returned from endpoint request handler must be a plain object
			body: { returnedMessage }
		};
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
