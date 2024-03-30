import TopBar from '@/components/shared/top-bar'

import Image from 'next/image'
import React from 'react'
import InstructorForm from './_components/instructor-form'

function Page() {
	return (
		<>
			<TopBar label='becomeInstructor' description='becomeInstructorDescription' />
			<div className='container mx-auto mt-12 min-h-[50vh] max-w-6xl'>
				<div className='grid grid-cols-1 gap-2 md:grid-cols-2 '>
					<InstructorForm />
					<Image
						src={'/assets/instructor.png'}
						alt='instructor'
						width={430}
						height={430}
						className='self-end justify-self-end'
					/>
				</div>
			</div>
		</>
	)
}

export default Page
