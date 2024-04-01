'use client'
import { Button } from '@/components/ui/button'
import useTranslate from '@/hooks/use-translate'
import React from 'react'

function ClearButton() {

	const t = useTranslate()
	return (
		<Button
			className='relative mx-auto block font-space-grotesk font-semibold'
			size={'lg'}
			rounded={'full'}
		>
			{t('clearAll')}
		</Button>
	)
}

export default ClearButton
