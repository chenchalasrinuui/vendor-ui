"use client"
import React from 'react'
import styles from './Home.module.css'
import { Animations } from '../shared/Animations'

export const Home = () => {
    return (
        <div className='container mb-5'>
            <h3 className='text-center my-3'>Welcome to Vendor module....</h3>

            <p>
                <p><b>Vendor Dashboard</b></p>
                Welcome vendors to their dedicated dashboard where they can monitor all aspects of their store. Provide insights on sales, orders, and inventory in one glance.
            </p>
            <Animations animClass="fadeAnim">
                <div className='mb-3'>
                    <p><b>Product Management</b></p>
                    Allow vendors to add, edit, and manage their product listings, descriptions, prices, and stock levels. Include an option to upload high-quality images and assign categories to make products easily searchable.

                </div>
            </Animations>
            <div className='mb-3'>
                <p><b> Order Management</b></p>
                Streamline order processing by offering features for tracking orders, managing returns, and updating order status. Add notifications for new orders and provide detailed order summaries.
            </div>
            <div className='mb-3'>
                <p><b>Vendor Dashboard</b></p>
                4. Inventory Tracking
                Help vendors stay on top of stock levels with real-time inventory tracking. Set low-stock alerts to keep product availability up-to-date and avoid missed sales opportunities.
            </div>
            <div className='mb-3'>
                <p><b>Analytics and Reports</b></p>
                Provide detailed analytics on sales performance, top-selling products, and customer demographics. Regular reports will help vendors make informed decisions to grow their businesses.
            </div>
            <div className='mb-3'> <p><b> Payments and Earnings</b></p>
                6. Payments and Earnings
                Offer a clear view of earnings with options to track payment schedules, pending payouts, and transaction history. Make sure that all payments are secure and processed efficiently.
            </div>
            <Animations animClass="fadeAnim">
                <div className='mb-3'><p><b>Marketing and Promotion</b></p>
                    Enable vendors to create promotions, discounts, and special offers to attract more customers. This could include tools for cross-selling, upselling, and setting discounts for bulk purchases.
                </div>
                <div className='mb-3'><p><b>Support and Communication</b></p>
                    Provide vendors with an easy way to communicate with customers and support teams. This could include message boards, direct messaging, or customer review management.
                    <p><b>Compliance and Policies</b></p>
                    Include a section for guidelines on platform policies, return policies, and compliance standards. It ensures vendors are informed of any regulations they need to adhere to for smooth business operation.
                </div>
            </Animations>
        </div>
    )
}
