"use client"
import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_PRODUCTS } from '@/graphql/queries/getProducts'
import { AppTable } from '../shared/AppTable'
import { updateStoreData } from '@/services/functions'
import { useDispatch } from 'react-redux'
import { DELETE_PRODUCT } from '@/graphql/mutations/deleteProduct'
import { AppForm } from '../shared/AppForm'
import config from './config.json'
import { Input } from '../shared/Input'
import { TextArea } from '../shared/TextArea'
import { Select } from '../shared/Select'
import { handleFieldLevelValidation, handleFormLevelValidation } from '@/services/validations'


export const Products = () => {
    const dispatch = useDispatch();
    const [isShowForm, setIsShowForm] = useState(false)
    const [inputControls, setInputControls] = useState(config)

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

    const fnAddProduct = () => {
        setIsShowForm(true);
    }

    const handleChange = (eve) => {
        handleFieldLevelValidation(eve, inputControls, setInputControls)

    }

    const handleSubmit = async () => {
        const [isInValid, data] = await handleFormLevelValidation(inputControls, setInputControls)
        if (isInValid) return;
        console.log(data);
        alert("send request...")
    }

    return (
        <div>
            <p className='text-end me-2 mt-3'>
                <button onClick={fnAddProduct} className='btn btn-primary'>Add Product</button>
            </p>
            <AppTable
                imgThs={["Image"]}
                imgTds={["filePath"]}
                ths={["Name", "Cost", "Category", "Description"]}
                tds={["name", 'cost', 'category', "description"]}
                data={data?.getProducts || []}
                handleDelete={handleDelete}
            />

            {isShowForm && <AppForm setShowForm={setIsShowForm}>
                {
                    inputControls.map((obj) => {
                        switch (obj.tag) {
                            case 'input':
                                return <Input {...obj} hanldeChange={handleChange} />
                            case 'select':
                                return <Select {...obj} hanldeChange={handleChange} />
                            default:
                                return <TextArea {...obj} hanldeChange={handleChange} />
                        }
                    })
                }
                <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
            </AppForm>}
        </div>
    )
}
