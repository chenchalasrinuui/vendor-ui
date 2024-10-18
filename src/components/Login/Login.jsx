import { Input } from '@/components/shared/Input'
import React, { useContext, useState } from 'react'
import config from './config.json'
import { handleFieldLevelValidation, handleFormLevelValidation } from '@/services/validations'
import { updateStoreData } from '@/services/functions'
import { AppCookies } from '@/services/cookies'
export const Login = () => {
    const [inputControls, setInputControls] = useState(config)
    const fnLogin = async () => {
        try {
            const [isInValid, data] = handleFormLevelValidation(inputControls, setInputControls)
            if (isInValid) return;

        } catch (ex) {

        } finally {
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
