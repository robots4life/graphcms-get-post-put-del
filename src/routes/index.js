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

	const requestHeaders1 = {
		authorization: 'Bearer ' + GRAPH_CMS_MESSAGE_TOKEN
	};
	// console.log(requestHeaders1);

	const requestHeaders2 = {
		authorization:
			'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NTY5MzUyODIsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NsNTZvY3UyNzQyY3UwMXVtaGkxZ2dlcHAvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiZjdmMWM0OWEtZTVjMC00OGUzLThkZWItZDMwNWZmNmQ2NjRkIiwianRpIjoiY2w1Nm9oaThiNDBvbTAxdWo2cWdsaHR0aiJ9.uLdNhEeEzUKPUTJDXfK-_RFipGXqVeGX3JkKM2QDir26ubKjOyfiSwioDrXRa9J_b5cZiLhW4KmGAPlEwL0dvalvNpX7VwpN-YkF2sRBLlPghw-QvRACobe2V8ph3tkHG4a0aWO7tkKz3FOmzWS3TruyJmaGlDQWW6xOHZC8BHVyOv81iUu0F7DBpqrzSPqELLsUyaF0Dgbjtup8FULhFXTO5aQvagXpRweGrvM1TzPSJtJxYZQbthvPVo2ZR86Sa7UOsO02c7s-tyGPGL4XVnbygIkbo032yQPQpmWnOFaJUq76VwIBukfe8czN9qlMTzrQDyCICkXnt8oHPyztI_v7iFthaNMDwsAEkPKKPcAEjSwTcq2ICbUbrv_924J9vhlQXwg7GczziI8XrHC6ItkvK9xGe-YntG9zI_r6-HY1hgpPhjiOMbM2mC2Y8A5ZxCJHEOaCm5YPizpmNI8ev6JubjueFIGE2Fy7NdqZOR-6RxJR9IlkuY96yKNJAYxEiTDQEU65weFKmlpEie12DGKgIr5rLwTPv_vRGgVvhmrKfLGlJKu4DWopJWxSu6IAjjj51d32CtElZ1bbQOr3lVIQNe143Q-JRPr1TZ0PTxgpOaOgE9pjeDhAfOJakSWtGa-Xu5eZv-kxTnLQ4wsxnJY2wHEa5GOWRaOb0i4zKtM'
	};
	console.log(requestHeaders2);

	try {
		// Overrides the clients headers with the passed values
		const data = await client.request(query, variables, requestHeaders2);
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
