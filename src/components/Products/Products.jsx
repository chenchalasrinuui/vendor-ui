"use client"
import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '@/graphql/queries/getProducts'
import { AppTable } from '../shared/AppTable'

export const Products = () => {
    const { data, error, loading } = useQuery(GET_PRODUCTS)
    return (
        <div>

            <AppTable
                ths={["Image", "Name", "Cost", "Category", "Description"]}
                tds={["filePath", "name", 'cost', 'category', "description"]}
                data={data?.getProducts || []}

            />
        </div>
    )
}
