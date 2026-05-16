import nodemailer from 'nodemailer'
import twilio from 'twilio'
import productModel from '../models/productModel.js'
import userModel from '../models/userModel.js'

const createEmailTransporter = () => {
    const host = process.env.NOTIFY_EMAIL_HOST
    const port = Number(process.env.NOTIFY_EMAIL_PORT || 587)
    const secure = process.env.NOTIFY_EMAIL_SECURE === 'true'
    const user = process.env.NOTIFY_EMAIL_USER
    const pass = process.env.NOTIFY_EMAIL_PASS

    if (!host || !user || !pass) {
        console.log('Notification email transport is not configured. Skipping email.')
        return null
    }

    return nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass }
    })
}

const sendEmail = async ({ to, subject, html }) => {
    const transporter = createEmailTransporter()
    if (!transporter) return

    try {
        await transporter.sendMail({
            from: process.env.NOTIFY_EMAIL_FROM || process.env.NOTIFY_EMAIL_USER,
            to,
            subject,
            html
        })
        console.log(`Notification email sent to ${to}`)
    } catch (error) {
        console.log('Failed to send notification email:', error.message)
    }
}

const sendSms = async ({ to, body }) => {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const from = process.env.TWILIO_FROM_NUMBER

    if (!accountSid || !authToken || !from || !to) {
        console.log('Twilio SMS is not configured or destination is missing. Skipping SMS.')
        return
    }

    try {
        const client = twilio(accountSid, authToken)
        await client.messages.create({
            body,
            from,
            to
        })
        console.log(`Notification SMS sent to ${to}`)
    } catch (error) {
        console.log('Failed to send notification SMS:', error.message)
    }
}

export const sendCartAddNotification = async ({ userId, itemId, size, quantity = 1 }) => {
    try {
        const product = await productModel.findById(itemId)
        const user = await userModel.findById(userId)

        const notifyEmail = process.env.NOTIFY_EMAIL || process.env.ADMIN_EMAIL
        const notifyPhone = process.env.NOTIFY_PHONE

        const productName = product?.name || 'Unknown Product'
        const customerName = user?.name || 'Customer'
        const customerEmail = user?.email || 'unknown'
        const cartUrl = process.env.FRONTEND_URL || 'http://localhost:3000'

        const text = `Product added to cart:\nCustomer: ${customerName} (${customerEmail})\nProduct: ${productName}\nSize: ${size}\nQuantity: ${quantity}\nCart page: ${cartUrl}/cart`
        const html = `<p><strong>Product added to cart</strong></p>
            <p>Customer: ${customerName} (${customerEmail})</p>
            <p>Product: ${productName}</p>
            <p>Size: ${size}</p>
            <p>Quantity: ${quantity}</p>
            <p><a href="${cartUrl}/cart">View cart</a></p>`

        await Promise.allSettled([
            notifyEmail ? sendEmail({ to: notifyEmail, subject: 'Product Added to Cart', html }) : Promise.resolve(),
            notifyPhone ? sendSms({ to: notifyPhone, body: text }) : Promise.resolve()
        ])
    } catch (error) {
        console.log('Error sending cart notification:', error.message)
    }
}
