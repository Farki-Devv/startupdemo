import { getAdminCourse } from '@/actions/course.action'
import { SearchParamsProps } from '@/app.types'
import AdminCourseCard from '@/components/cards/admin-course.card'
import Header from '@/components/shared/header'
import Pagination from '@/components/shared/pagination'
import React from 'react'

async function Page({ searchParams }: SearchParamsProps) {
	const page = searchParams.page ? +searchParams.page : 1
	const courseData = await getAdminCourse({ page, pageSize: 6 })
	return (
		<>
			<Header title='All courses' description='Here all the courses you have' />
			<div className='mt-4 grid grid-cols-3 gap-4'>
				{courseData.courses.map(item => (
					<AdminCourseCard
						key={item._id}
						course={JSON.parse(JSON.stringify(item))}
					/>
				))}
			</div>
			<div className='mt-6'>
				<Pagination pageNumber={page} isNext={courseData.isNext} />
			</div>
		</>
	)
}

export default Page
