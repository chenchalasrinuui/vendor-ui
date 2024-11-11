"use client"
import React, { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_PRODUCTS } from '@/graphql/queries/getProducts'
import { AppTable } from '../shared/AppTable'
import { updateStoreData } from '@/services/functions'
import { useDispatch } from 'react-redux'
import { DELETE_PRODUCT } from '@/graphql/mutations/deleteProduct'

export const Products = () => {
    const dispatch = useDispatch();

    const [executeDeleteProductMutation] = useMutation(DELETE_PRODUCT)
    const { data, error, loading, refetch } = useQuery(GET_PRODUCTS, {
        fetchPolicy: 'no-cache', // Doesn't check cache before making a network request
    })

    useEffect(() => {
        updateStoreData(dispatch, "LOADER", loading)
    }, [loading])
    const deleteProdct = async ({ _id, filePath }) => {
        try {
            updateStoreData(dispatch, 'LOADER', true)
            const res = await executeDeleteProductMutation({
                variables: {
                    "data": {
                        "id": _id,
                        "path": filePath
                    }
                }
            })
            const { acknowledged, deletedCount } = res?.data?.deleteProduct
            let isSuccess = false
            if (acknowledged && deletedCount > 0) {
                refetch()
                isSuccess = true
            }
            updateStoreData(dispatch, 'TOASTER', {
                isShowToaster: true,
                toasterMsg: isSuccess ? 'Success' : "failed",
                color: isSuccess ? 'green' : 'red'
            })
        } catch (ex) {
            updateStoreData(dispatch, 'TOASTER', {
                isShowToaster: true,
                toasterMsg: ex?.message,
                color: 'red'
            })
        } finally {
            updateStoreData(dispatch, 'LOADER', false)

        }
    }
    const handleDelete = (row) => {
        updateStoreData(dispatch, 'MODAL', {
            isShowModal: true,
            modalAction: () => deleteProdct(row)
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
