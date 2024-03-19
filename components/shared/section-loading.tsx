import React from 'react'
import { Skeleton } from '../ui/skeleton'

function SectionLoading() {
	return (
		<Skeleton className='flex h-12 items-center justify-between px-2 py-4'>
			<div className='flex flex-1 items-center space-x-2'>
				<Skeleton className='size-4 bg-blue-400' />
				<Skeleton className='h-4 w-1/2 bg-blue-400' />
			</div>
			<Skeleton className='size-4 bg-blue-400' />
		</Skeleton>
	)
}

export default SectionLoading
