'use client'

import { IUser } from '@/app.types'
import InstructorCard from '@/components/cards/instructor.card'
import { Button } from '@/components/ui/button'

import useTranslate from '@/hooks/use-translate'
import { MoveUpRight } from 'lucide-react'
import Link from 'next/link'
interface Props {
	instructor: IUser[]
}
function Instructor({ instructor }: Props) {
	const t = useTranslate()

	return (
		<div className='container mx-auto max-w-6xl py-12'>
			<div className='flex grid-cols-1 items-center justify-between max-md:grid'>
				<div className='flex flex-col space-y-1'>
					<h1 className='font-space-grotesk text-3xl font-bold'>
						{t('learnInstructors')}
					</h1>
					<p className='text-sm text-muted-foreground'>
						{t('learnInstructorsDescription')}
					</p>
				</div>

				<div className='flex items-center gap-1 self-end'>
					<Button variant={'secondary'}>
						<Link href={'/instructors'}>
							<span>{t('viewAll')}</span>
						</Link>
						<MoveUpRight className='ml-2 size-5 font-bold' />
					</Button>
				</div>
			</div>

			<div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
				{instructor.map(item => (
					<InstructorCard key={item._id} instructor={item} />
				))}
			</div>

			<div className='mt-6 text-center text-sm'>
				{t('becomeInstructor1')}{' '}
				<Link
					href={'/become-instructor'}
					className='text-blue-500 underline hover:text-blue-600'
				>
					{t('becomeInstructor2')}
				</Link>
			</div>
		</div>
	)
}

export default Instructor
