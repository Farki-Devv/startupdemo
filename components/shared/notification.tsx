'use client'

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'
import { getCount } from '@/actions/notification.action'

function Notification() {
	const [count, setCount] = useState(0)
	const { userId } = useAuth()

	useEffect(() => {
		const fetchCount = async () => {
			try {
				const data = await getCount(userId!)
				setCount(data)
				console.log(data)
			} catch (error) {
				setCount(0)
			}
		}

		userId && fetchCount()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<Button
			size={'icon'}
			variant={count === 0 ? 'ghost' : 'secondary'}
			className='relative'
		>
			<Link href={'/profile/notifications'}></Link>
			<Bell />

			<div className='absolute -right-2 -top-2 flex size-6 items-center  justify-center rounded-full bg-destructive'>
				{count}
			</div>
		</Button>
	)
}

export default Notification
