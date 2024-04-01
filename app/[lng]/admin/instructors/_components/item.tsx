'use client'
import { IUser } from '@/app.types'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { MoreHorizontal } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { usePathname } from 'next/navigation'
import { updateUser } from '@/actions/user.action'
import { toast } from 'sonner'
import { sendNotification } from '@/actions/notification.action'
interface Props {
	item: IUser
}
function Item({ item }: Props) {
	const pathname = usePathname()
	const onRoleChange = async () => {
		const msg = item.role === 'instuctor' ? 'Disapprove' : 'Approve'
		const isConfirmed = confirm(`Are you sure you want to ${msg} this user ?`)
		if (isConfirmed) {
			const upd = updateUser({
				clerkId: item.clerkId,
				updatedData: {
					role: item.role === 'user' ? 'instructor' : 'user',
				},
				path: pathname,
			})
			const not = sendNotification(
				item.clerkId,
				`messageRoleChanged ${item.role === 'user' ? 'instructor' : 'user'}`
			)
			const promise = Promise.all([upd, not])
			toast.promise(promise, {
				loading: 'Loading...',
				success: `${msg} Successfully updated!`,
				error: 'Something went wrong. Please try again.',
			})
		}
	}

	const onAdmin = async () => {
		const isConfirmed = confirm(
			`Are you sure you want to  this user an admin ?`
		)
		if (isConfirmed) {
			const promise = updateUser({
				clerkId: item.clerkId,
				updatedData: {
					isAdmin: true,
				},
				path: pathname,
			})
			toast.promise(promise, {
				loading: 'Loading...',
				success: ` Successfully updated to admin!`,
				error: 'Something went wrong. Please try again.',
			})
		}
	}
	const onDelete = async () => {
		const isConfirmed = confirm(
			`Are you sure you want to   instructor deleted ?`
		)
		if (isConfirmed) {
			const promise = updateUser({
				clerkId: item.clerkId,
				updatedData: {
					approvedInstructor: false,
					role: 'user',
					isAdmin: false,
				},
				path: pathname,
			})
			toast.promise(promise, {
				loading: 'Loading...',
				success: ` Successfully updated to admin!`,
				error: 'Something went wrong. Please try again.',
			})
		}
	}
	return (
		<>
			<TableRow>
				<TableCell className='text-xs capitalize'>
					{item.isAdmin ? 'Admin/' : ''} {item.role}
				</TableCell>
				<TableCell className='text-xs'>{item.email}</TableCell>
				<TableCell
					className='cursor-pointer text-xs font-medium text-primary hover:underline'
					onClick={() => window.open(item.website, '_blank')}
				>
					{item.website.replace(/^https?:\/\//, '')}
				</TableCell>
				<TableCell
					className='cursor-pointer text-xs font-medium text-primary hover:underline'
					onClick={() => window.open(item.website, '_blank')}
				>
					{item.youtube.replace(/^https?:\/\//, '')}
				</TableCell>
				<TableCell
					className='cursor-pointer text-xs font-medium text-primary hover:underline'
					onClick={() => window.open(item.website, '_blank')}
				>
					{item.github.replace(/^https?:\/\//, '')}
				</TableCell>
				<TableCell className='text-xs'>{item.job}</TableCell>
				<TableCell className='text-right'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button size={'icon'} variant={'ghost'}>
								<MoreHorizontal className='size-6' />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Manage</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={onRoleChange}>
								{item.role === 'instructor' ? 'Disapprove' : 'Approve'}
							</DropdownMenuItem>
							<DropdownMenuItem onClick={onAdmin}>Admin</DropdownMenuItem>
							<DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</TableCell>
			</TableRow>
		</>
	)
}

export default Item
