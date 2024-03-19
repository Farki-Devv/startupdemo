import { IBlog } from '@/types'
import request, { gql } from 'graphql-request'
import { cache } from 'react'
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!

export const getBlogs = async () => {
	const query = gql`
		query MyQuery {
			cmsBlogs {
				title
				description
				tag {
					name
					slug
				}
				category {
					name
					slug
				}
				author {
					title
					image {
						url
					}
				}
				image {
					url
				}
				content {
					html
				}
				slug
			}
		}
	`
	const { cmsBlogs } = await request<{ cmsBlogs: IBlog[] }>(graphqlAPI, query)

	return cmsBlogs
}

export const getDetailedBlog = cache(async (slug: string) => {
	const query = gql`
		query MyQuery($slug: String!) {
			cmsBlog(where: { slug: $slug }) {
				author {
					title
					bio
					image {
						url
					}
				}
				content {
					html
				}
				createdAt
				image {
					url
				}
				slug
				tag {
					name
					slug
				}
				title
			}
		}
	`

	const { cmsBlog } = await request<{ cmsBlog: IBlog }>(graphqlAPI, query, {
		slug,
	})
	return cmsBlog
})
