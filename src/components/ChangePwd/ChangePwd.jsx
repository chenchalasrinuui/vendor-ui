"use client"
import React, { useState } from 'react'
import styles from './ChangePwd.module.css'
import config from './config.json'
import { Input } from '../shared/Input'
import { handleFieldLevelValidation, handleFormLevelValidation } from '@/services/validations'
import { Captcha } from '../shared/Captcha'
export const ChangePwd = () => {
    const [inputControls, setInputControls] = useState(config)
    const [isValidCaptcha, setIsValidCaptch] = useState(false);
    const handleChange = (eve) => {
        handleFieldLevelValidation(eve, inputControls, setInputControls)
    }

    const handleChangePwd = () => {
        if (!isValidCaptcha) {
            alert('invalid captch')
            return;
        }
        const [isInValid, data] = handleFormLevelValidation(inputControls, setInputControls)
        if (isInValid) return;
    }

    const validateCaptcha = (isValid) => {
        setIsValidCaptch(isValid)
    }

    return (
        <div className='container-fluid'>
            <h5 className='text-center my-5'>Change Password</h5>
            {
                inputControls.map((obj) => {
                    return <Input {...obj} hanldeChange={handleChange} />
                })
            }

            <Captcha validateCaptcha={validateCaptcha} />

            <div className='row mb-3'>
                <div className='offset-sm-5 col-sm-7'>
                    <button className='btn btn-primary' onClick={handleChangePwd}>Change Password</button>
                </div>
            </div>
        </div>
    )
}
