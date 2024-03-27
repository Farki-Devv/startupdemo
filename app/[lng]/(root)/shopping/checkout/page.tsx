import TopBar from '@/components/shared/top-bar'
import { translation } from '@/i18n/server'
import { LngParams } from '@/types'
import CheckoutElemet from './_components/checkout-elemet'
import { getCustomerCards } from '@/actions/customer.action'
import { auth } from '@clerk/nextjs'

async function Page({ params }: LngParams) {
	const { t } = await translation(params.lng)
	const { userId } = auth()
	const cards = await getCustomerCards(userId!)
	console.log(<cards></cards>)
	return (
		<>
			<TopBar label={'shoppingCart'} extra={t('checkout')} />
			<CheckoutElemet cards={JSON.parse(JSON.stringify(cards))} />
		</>
	)
}

export default Page
