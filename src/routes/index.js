import { client } from '$lib/graphql-client';
import { gql } from 'graphql-request';

export async function get(request) {
	try {
		const getMessages = gql`
			query getMessages {
				messages {
					id
					name
					text
					price
				}
			}
		`;
		const messages = await client.request(getMessages);
		return {
			status: 200,
			body: {
				messages
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

export async function post({ request }) {
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
		name: 'Mary',
		text: '27',
		price: Date.now()
	};
	const GRAPH_CMS_MESSAGE_TOKEN = process.env['GRAPH_CMS_MESSAGE_TOKEN'];
	const requestHeaders = { authorization: 'Bearer ' + GRAPH_CMS_MESSAGE_TOKEN };
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
		console.log(returnedMessage);

		return {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			},
			body: returnedMessage
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
