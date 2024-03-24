'use client'
import { useReview } from '@/hooks/use-review'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '../ui/dialog'
import FillLoading from '../shared/fill-loading'
import ReactStars from 'react-stars'
import { useForm } from 'react-hook-form'
import { reviewSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useAuth } from '@clerk/nextjs'
import { createReview, getReview, updateReview } from '@/actions/review.action'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { IReview } from '@/app.types'
import useTranslate from '@/hooks/use-translate'

function ReviewModal() {
	const [rating, setRating] = useState(0)
	const [review, setReview] = useState<IReview | null>(null)
	const { isOpen, onClose, isLoading, startLoading, stopLoading } = useReview()
	const { userId } = useAuth()
	const { courseId } = useParams()
	const t = useTranslate()
	const form = useForm<z.infer<typeof reviewSchema>>({
		resolver: zodResolver(reviewSchema),
		defaultValues: { data: '' },
	})
	const onSubmit = async (values: z.infer<typeof reviewSchema>) => {
		startLoading()
		const data = { ...values, rating }
		let promise
		if (review) {
			promise = updateReview({ ...data, _id: review._id })
		} else {
			promise = createReview(data, userId!, `${courseId}`)
		}
		promise.then(() => onClose()).finally(() => stopLoading())

		toast.promise(promise, {
			loading: t('loading'),
			success: t('successfully'),
			error: t('error'),
		})
	}
	useEffect(() => {
		async function fetchReview() {
			startLoading()
			const res = await getReview(`${courseId}`, userId!)
			if (res) {
				setRating(res.rating)
				setReview(res)
				form.setValue('data', res.data)
			}
			stopLoading()
		}

		fetchReview()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen])
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				{isLoading && <FillLoading />}

				<div className='flex flex-col items-center justify-center space-y-4'>
					<div className='mt-4 text-xl font-medium'>{t('changeReview')}</div>
					<ReactStars
						value={rating}
						size={40}
						onChange={val => setRating(val)}
						color1='#E59888'
					/>
					{rating ? (
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='flex w-full flex-col gap-4'
							>
								<FormField
									control={form.control}
									name='data'
									render={({ field }) => (
										<FormItem className='flex w-full flex-col'>
											<FormControl>
												<Textarea
													className='h-36 resize-none border-none bg-secondary font-medium'
													placeholder={t('reviewPleaseholder')}
													{...field}
													disabled={isLoading}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className='flex justify-end'>
									<Button
										type='submit'
										disabled={isLoading}
										className='font-space-grotesk font-bold'
									>
										{review ? t('change') : t('submit')}
									</Button>
								</div>
							</form>
						</Form>
					) : null}
				</div>
			</DialogContent>
		</Dialog>
	)
}
export default ReviewModal
