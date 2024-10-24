"use client"
import React, { useRef, useState } from 'react'
import styles from './ChangePwd.module.css'
import config from './config.json'
import { Input } from '../shared/Input'
import { handleFieldLevelValidation, handleFormLevelValidation, clearFormData } from '@/services/validations'
import { useMutation } from '@apollo/client'
import { Captcha } from '../shared/Captcha'
import { CHANGE_PWD } from '@/graphql/mutations/changePwdQuery'
import { AppCookies } from '@/services/cookies'
import { updateStoreData } from '@/services/functions'
import { useDispatch } from 'react-redux'

export const ChangePwd = () => {
    const [inputControls, setInputControls] = useState(config)
    const [isValidCaptcha, setIsValidCaptch] = useState(false);
    const [isFirstTimeLoad, setIsFirstTimeLoad] = useState(true);
    const [fnChangePwd] = useMutation(CHANGE_PWD)
    const dispatch = useDispatch();
    const refreshBtnRef = useRef();

    const handleChange = (eve) => {
        handleFieldLevelValidation(eve, inputControls, setInputControls)
    }

    const handleChangePwd = async () => {
        try {
            const [isInValid, { pwd, newPwd }] = handleFormLevelValidation(inputControls, setInputControls)
            if (isInValid) return;
            if (!isValidCaptcha) {
                setIsFirstTimeLoad(false);
                return;
            };
            updateStoreData(dispatch, 'LOADER', true)
            const res = await fnChangePwd({
                variables: {
                    "newPwd": newPwd,
                    "changePasswordId": AppCookies.getCookie('id'),
                    "pwd": pwd
                }
            })
            const { message, errorCode, acknowledged, modifiedCount } = res?.data?.changePassword
            let color = 'red';
            let msg = message;
            if (!errorCode) {
                if (acknowledged && modifiedCount) {
                    msg = "Passwrd changed"
                    color = "green"
                    clearFormData(inputControls, setInputControls);
                    refreshBtnRef.current.click();
                } else {
                    msg = "Password not changed"
                }
            }

            updateStoreData(dispatch, 'TOASTER', {
                isShowToaster: true,
                toasterMsg: msg,
                color: color
            })

        } catch (ex) {

        } finally {
            updateStoreData(dispatch, 'LOADER', false)
        }

    }

    const validateCaptcha = (isValid) => {
        setIsValidCaptch(isValid)
    }

    return (
        <div className='container-fluid skew'>
            <h5 className='text-center my-5'>Change Password</h5>
            {
                inputControls.map((obj) => {
                    return <Input {...obj} hanldeChange={handleChange} />
                })
            }

            <Captcha ref={refreshBtnRef} validateCaptcha={validateCaptcha} isValidCaptcha={isValidCaptcha} isFirstTimeLoad={isFirstTimeLoad} />

            <div className='row mb-3'>
                <div className='offset-sm-5 col-sm-7'>
                    <button className='btn btn-primary' onClick={handleChangePwd}>Change Password</button>
                </div>
            </div>
        </div>
    )
}
