import { getAdminReviews } from '@/actions/course.action'
import { SearchParamsProps } from '@/app.types'
import InstructorReviewCard from '@/components/cards/instructor-review.card'
import Header from '@/components/shared/header'
import Pagination from '@/components/shared/pagination'
import React from 'react'

async function Page({ searchParams }: SearchParamsProps) {
	const page = searchParams.page ? +searchParams.page : 1

	const reviewData = await getAdminReviews({ page, pageSize: 6 })

	return (
		<>
			<Header title='Reviews' description='Here are all the reviews' />
			<div className='mt-4 rounded-md bg-background p-4'>
				<div className='flex flex-col space-y-4'>
					{reviewData.reviews.map(review => (
						<InstructorReviewCard
							key={review._id}
							review={JSON.parse(JSON.stringify(review))}
						/>
					))}
				</div>
				<div className='mt-6'>
					<Pagination pageNumber={page} isNext={reviewData.isNext} />
				</div>
			</div>
		</>
	)
}

export default Page
