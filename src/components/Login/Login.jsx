import { Input } from '@/components/shared/Input'
import React, { useContext, useState } from 'react'
import config from './config.json'
import { handleFieldLevelValidation, handleFormLevelValidation } from '@/services/validations'
import { updateStoreData } from '@/services/functions'
import { AppCookies } from '@/services/cookies'
import { useLazyQuery } from '@apollo/client'
import { USER_LOGIN } from '@/graphql/queries/userLogin'
import { useDispatch } from 'react-redux'
export const Login = () => {
    const [inputControls, setInputControls] = useState(config)
    const [fnAuth] = useLazyQuery(USER_LOGIN)
    const dispatch = useDispatch();
    const fnLogin = async () => {
        try {
            const [isInValid, data] = handleFormLevelValidation(inputControls, setInputControls)
            if (isInValid) return;
            updateStoreData(dispatch, 'LOADER', true)
            const res = await fnAuth({
                variables: {
                    data
                }
            })
            const { _id, uid, phone } = res?.data?.handleLogin?.[0] || {}
            if (uid) {
                AppCookies.setCookie("uid", uid, 7)
                AppCookies.setCookie("phone", phone, 7)
                AppCookies.setCookie("id", _id, 7)
                updateStoreData(dispatch, 'LOGIN', true)
            } else {
                updateStoreData(dispatch, 'TOASTER', {
                    isShowToaster: true,
                    toasterMsg: 'Check uid or pwd',
                    color: 'red'
                })
            }
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
    const handleChange = (eve) => {
        handleFieldLevelValidation(eve, inputControls, setInputControls)
    }

    return (
        <div className='container-fluid'>
            <h3 className='mt-3 mb-3 text-center'>Login</h3>
            {
                inputControls.map((obj) => {
                    return <Input {...obj} hanldeChange={handleChange} />
                })
            }
            <div className='row mb-3'>
                <div className='offset-sm-5 col-sm-7'>
                    <button className='btn btn-primary' onClick={fnLogin}>Login</button>
                </div>
            </div>

        </div>
    )
}
