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
		// console.log(messages);

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
	const variables = {
		name: 'Hans',
		text: '42',
		price: Date.now()
	};

	try {
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
		const createdMessage = await client.request(createMessage, variables, requestHeaders);
		// CATCH ERROR HERE !!

		const publishMessage = gql`
			mutation publishMessage($id: ID!) {
				publishMessage(where: { id: $id }, to: PUBLISHED) {
					id
				}
			}
		`;
		const messageID = { id: createdMessage.createMessage.id };
		const publishedMessage = await client.request(publishMessage, messageID, requestHeaders);
		// CATCH ERROR HERE !!

		let returnedMessage = JSON.stringify(publishedMessage);
		console.log(returnedMessage);

		return {
			status: 200
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
