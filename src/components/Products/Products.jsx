"use client"
import React, { useRef, useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_PRODUCTS } from '@/graphql/queries/getProducts'
import { UPDATE_PRODUCT } from '@/graphql/mutations/updateProduct'
import { AppTable } from '../shared/AppTable'
import { updateStoreData } from '@/services/functions'
import { useDispatch } from 'react-redux'
import { DELETE_PRODUCT } from '@/graphql/mutations/deleteProduct'
import { SAVE_PRODUCT } from '@/graphql/mutations/saveProduct'
import { AppForm } from '../shared/AppForm'
import config from './config.json'
import { Input } from '../shared/Input'
import { TextArea } from '../shared/TextArea'
import { Select } from '../shared/Select'
import { handleFieldLevelValidation, handleFormLevelValidation, clearFormData, setFormData } from '@/services/validations'
import { AppCookies } from '@/services/cookies'


export const Products = () => {
    const dispatch = useDispatch();
    const [isShowForm, setIsShowForm] = useState(false)
    const [inputControls, setInputControls] = useState(config)
    const [isEdit, setIsEdit] = useState(false)
    const [executeDeleteProductMutation] = useMutation(DELETE_PRODUCT)
    const [executeUpdateProductMutation] = useMutation(UPDATE_PRODUCT)
    const [fnSaveProduct] = useMutation(SAVE_PRODUCT)
    const updateProductIdRef = useRef();
    const { data, error, loading, refetch } = useQuery(GET_PRODUCTS, {
        fetchPolicy: 'no-cache', // Doesn't check cache before making a network request
    })

    useEffect(() => {
        updateStoreData(dispatch, "LOADER", loading)
    }, [loading])

    const deleteProdct = async ({ _id, file }) => {
        try {
            updateStoreData(dispatch, 'LOADER', true)
            const res = await executeDeleteProductMutation({
                variables: {
                    "data": {
                        "id": _id,
                        "path": file
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
    /**
     * handle edit button click
     * @param {rowData} obj 
     */
    const handleEdit = (obj) => {
        setIsEdit(true);
        updateProductIdRef.current = obj._id
        setFormData(inputControls, setInputControls, obj)
        setIsShowForm(true);
    }

    const fnAddProduct = () => {
        setIsShowForm(true);
        setIsEdit(false)
    }

    const handleChange = async (eve) => {
        await handleFieldLevelValidation(eve, inputControls, setInputControls)

    }

    const handleSubmit = async () => {

        try {
            const [isInValid, { category, name, cost, description, file }] = await handleFormLevelValidation(inputControls, setInputControls)
            if (isInValid) return;
            updateStoreData(dispatch, 'LOADER', true)
            const res = await fnSaveProduct({
                variables: {
                    file: file[0],
                    "productInput": {
                        name,
                        cost: Number(cost),
                        category,
                        description,
                        vendor: AppCookies.getCookie("id")
                    }
                }
            })
            const { acknowledged, insertedId } = res?.data?.saveProduct
            let isSuccess = false
            if (acknowledged && insertedId) {
                refetch()
                isSuccess = true
                setIsShowForm(false)
                clearFormData(inputControls, setInputControls)
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

    const fnUpdateProduct = async () => {
        try {
            const [isInValid, { category, name, cost, description, file, filePath }] = await handleFormLevelValidation(inputControls, setInputControls, isEdit)
            if (isInValid) return;
            debugger;
            updateStoreData(dispatch, 'LOADER', true)

            const res = await executeUpdateProductMutation({
                variables: {
                    file: file?.[0] || null,
                    "productInput": {
                        "id": updateProductIdRef.current,
                        name,
                        "cost": Number(cost),
                        category,
                        description,
                        filePath: filePath
                    }
                }
            })
            const { acknowledged, modifiedCount, isImageModified } = res?.data?.updateProduct
            let isSuccess = false
            if (acknowledged && (modifiedCount || isImageModified)) {
                refetch()
                isSuccess = true
                setIsShowForm(false)
                clearFormData(inputControls, setInputControls)
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

    const fnHideForm = () => {
        clearFormData(inputControls, setInputControls)
        setIsShowForm(false);
    };

    return (
        <div>
            <p className='text-end me-2 mt-3'>
                <button onClick={fnAddProduct} className='btn btn-primary'>Add Product</button>
            </p>
            <AppTable
                imgThs={["Image"]}
                imgTds={["file"]}
                ths={["Name", "Cost", "Category", "Description"]}
                tds={["name", 'cost', 'category', "description"]}
                data={data?.getProducts || []}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
            {isShowForm && <AppForm setShowForm={fnHideForm}>
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

                {isEdit ? <button className='btn btn-primary' onClick={fnUpdateProduct}>Update</button> :
                    <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>}
            </AppForm>}
        </div>
    )
}
