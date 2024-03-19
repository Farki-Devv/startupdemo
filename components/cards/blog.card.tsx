import { IBlog } from '@/types'
import { CalendarDays, Clock, Dot, Minus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import Link from 'next/link'

function BlogCard(blog: IBlog) {
	return (
		<Link href={`/blogs/${blog.slug}`}>
			<div className={'group grid grid-cols-1 gap-4'}>
				<div className='relative rounded-md bg-secondary'>
					<Image
						width={650}
						height={335}
						src={blog.image.url}
						alt={blog.title}
						className='-translate-y-6 rounded-md object-cover px-2 grayscale transition-all group-hover:-translate-y-7 group-hover:grayscale-0 max-md:-translate-y-2 max-md:group-hover:-translate-y-3 md:px-7'
					/>
				</div>

				<div className='flex flex-col space-y-4'>
					{/* Time info */}
					<div className='flex items-center gap-4'>
						<div className='flex items-center gap-2'>
							<CalendarDays className='size-5' />
							<p>feb, 08 2024</p>
						</div>
						<Minus />
						<div className='flex items-center gap-2'>
							<Clock className='size-5' />
							<p>02 min read</p>
						</div>
					</div>

					{/* Title */}
					<h2 className='font-space-grotesk text-3xl transition-colors group-hover:text-blue-500 max-md:text-2xl'>
						{blog.title}
					</h2>
					<p className='line-clamp-3 text-muted-foreground'>
						{blog.description}
					</p>

					{/* Author */}
					<div className='flex items-center gap-4'>
						<div className='flex items-center gap-2'>
							<Image
								src={blog.author.image.url}
								alt='author'
								width={30}
								height={30}
								className='rounded-sm object-cover'
							/>
							<p>by {blog.author.title}</p>
						</div>
						<Dot />
					</div>
				</div>
			</div>
		</Link>
	)
}

export default BlogCard
