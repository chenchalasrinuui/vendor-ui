import { Input } from '@/components/shared/Input'
import { appCtx } from '@/context/appCtx'
import React, { useContext, useState } from 'react'
import config from './config.json'
import axios from 'axios'
import { handleFieldLevelValidation, handleFormLevelValidation } from '@/services/validations'
import Ajax from '@/services/ajax'
import { updateStoreData } from '@/services/functions'
import { AppCookies } from '@/services/cookies'
export const Login = () => {
    const [inputControls, setInputControls] = useState(config)
    const { dispatch } = useContext(appCtx)
    const fnLogin = async () => {
        try {
            const [isInValid, data] = handleFormLevelValidation(inputControls, setInputControls)
            if (isInValid) return;
            updateStoreData(dispatch, 'LOADER', true)
            const res = await Ajax.post("auth/login", { data })
            if (res?.data?.length > 0) {
                updateStoreData(dispatch, 'LOGIN', true)
                const { _id, uid } = res?.data?.[0] || {}
                AppCookies.setCookie("id", _id, 10)
                AppCookies.setCookie("uid", uid, 10)
            } else {
                updateStoreData(dispatch, 'TOASTER', {
                    isShowToaster: true,
                    toasterMsg: 'Check ented uid or pwd',
                    color: 'red'
                })
            }
        } catch (ex) {

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
