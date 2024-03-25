import TopBar from '@/components/shared/top-bar'
import { translation } from '@/i18n/server'
import { LngParams } from '@/types'
import CheckoutElemet from './_components/checkout-elemet'

async function Page({ params }: LngParams) {
	const { t } = await translation(params.lng)
	return (
		<>
			<TopBar label={'shoppingCart'} extra={t('checkout')} />
			<CheckoutElemet />
		</>
	)
}

export default Page
