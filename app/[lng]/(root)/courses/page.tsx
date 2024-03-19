import TopBar from '@/components/shared/top-bar'
import AllCourses from './_components/all-courses'
import { SearchParamsProps } from '@/app.types'
import { getAllcourses } from '@/actions/course.action'

async function Page({ searchParams }: SearchParamsProps) {
	const resultJSON = await getAllcourses({
		page: searchParams.page ? +searchParams.page : 1,
		filter: searchParams.filter,
		searchQuery: searchParams.q,
	})
	const result = JSON.parse(JSON.stringify(resultJSON))
	return (
		<>
			<TopBar label='allCourses' description='allCourseDescription' />
			<AllCourses result={result} />
		</>
	)
}

export default Page
