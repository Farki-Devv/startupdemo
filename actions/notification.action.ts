'use server'

import Notification from '@/database/notification.model'
import { connectToDatabase } from '@/lib/mongoose'


export const sendNotification = async (clerkId: string, message: string) => {
	try {
		await connectToDatabase()
		await Notification.create({ user: clerkId, message })
	} catch (error) {
		throw new Error('Something went wrong')
	}
}
export const getCount = async (clerkId: string) => {
	try {
		await connectToDatabase()
		const data = await Notification.countDocuments({
			user: clerkId,
			isRead: false,
		})
		console.log(data)
		return data
	} catch (error) {
		throw new Error('Error getting notification count')
	}
}
export const getNotifications = async (clerkId: string) => {
	try {
		await connectToDatabase()
		const notification = await Notification.find({ user: clerkId }).sort({
			createdAt: -1,
		})
		notification.forEach(async n => {
			n.isRead = true
			await n.save()
		})
		return notification
	} catch (error) {
		throw new Error('Something went wrong')
	}
}
