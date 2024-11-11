"use client"
import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from '@/graphql/queries/getProducts'
import { AppTable } from '../shared/AppTable'
import { updateStoreData } from '@/services/functions'
import { useDispatch } from 'react-redux'
export const Products = () => {
    const dispatch = useDispatch();
    const { data, error, loading } = useQuery(GET_PRODUCTS, {
        fetchPolicy: 'no-cache', // Doesn't check cache before making a network request
    })
    useEffect(() => {
        updateStoreData(dispatch, "LOADER", loading)
    }, [loading])
    const deleteProdct = () => {
        alert('i am going to delete the product..')
    }
    const handleDelete = () => {
        updateStoreData(dispatch, 'MODAL', {
            isShowModal: true,
            modalAction: deleteProdct
        })
    }
    return (
        <div>

            <AppTable
                imgThs={["Image"]}
                imgTds={["filePath"]}
                ths={["Name", "Cost", "Category", "Description"]}
                tds={["name", 'cost', 'category', "description"]}
                data={data?.getProducts || []}
                handleDelete={handleDelete}
            />
        </div>
    )
}
