'use client'
import { INotification } from '@/app.types'
import useTranslate from '@/hooks/use-translate'
import { getTimeLocale } from '@/lib/utils'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'
import React from 'react'
import { RiNotification3Fill } from 'react-icons/ri'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'

interface Props {
	item: INotification
}
function NotificationCard({ item }: Props) {
	const { lng } = useParams()

	const t = useTranslate()
	return (
		<div className='group flex items-center justify-between rounded border-r bg-background/20 p-2 '>
			<div>
				<div className='flex items-center font-space-grotesk  font-medium'>
					<RiNotification3Fill />
					<div className='flex gap-1'>
						{item.message.split(' ').map(c => (
							<span key={c}>{t(c)}</span>
						))}{' '}
					</div>
				</div>
				<p className='text-sm text-gray-400'>
					{format(new Date(item.createdAt), 'MMMM dd , yyyy', {
						locale: getTimeLocale(`${lng}`),
					})}
				</p>
			</div>
			<Button
				size={'icon'}
				variant={'destructive'}
				className='size-8 opacity-0 transition-all duration-500  group-hover:opacity-100'
			>
				<Trash2 className='size-4' />
			</Button>
		</div>
	)
}

export default NotificationCard
