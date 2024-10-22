import React, { useState, useEffect } from 'react'
import styles from './Captcha.module.css'

export const Captcha = ({ validateCaptcha, isValidCaptcha, isFirstTimeLoad }) => {
    const [captchaText, setCapatchText] = useState('')
    useEffect(() => {
        fnGenerateCaptcha()
    }, [])
    const fnGenerateCaptcha = () => {
        let chars = "";

        const randomchar =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 1; i <= 5; i++) {
            chars += randomchar.charAt(
                Math.random() * randomchar.length)
        }
        setCapatchText(chars)
        validateCaptcha(false);
    }

    const handleChange = (eve) => {
        const value = eve.target.value
        validateCaptcha(value === captchaText)

    }
    return (
        <div className='row'>
            <div className='col-sm-5 text-end'>
                <b>Enter Captcha</b>
            </div>
            <div className='col-sm-3'>
                <p>
                    <input className='form-control' onChange={handleChange} />
                </p>
                <p>
                    <span className={styles.captcha}>{captchaText}</span><button onClick={fnGenerateCaptcha} className="btn btn-dark">refresh</button>
                </p>
            </div>
            <div className='col-sm-4 text-danger'>
                {!isFirstTimeLoad && !isValidCaptcha && <b>Invalid Captch</b>}
            </div>


        </div>
    )
}
