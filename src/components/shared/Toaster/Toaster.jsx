import React, { useContext, useEffect, useState } from 'react'
import styles from './Toaster.module.css'
import { appCtx } from '@/context/appCtx'
import { updateStoreData } from '@/services/functions'

export const Toaster = () => {
    const { state, dispatch } = useContext(appCtx)
    const { toasterMsg, color } = state?.toaster
    const [width, setWidth] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setWidth((prev) => {
                if (prev === 290) {
                    clearInterval(interval)
                    closeToaster();
                    return 0
                }
                return prev + 1
            })
        }, 50)
    }, [])
    const closeToaster = () => {
        updateStoreData(dispatch, 'TOASTER', {
            isShowToaster: false,
            toasterMsg: '',
            color: ''
        })
    }
    return (
        <div className={styles?.toaster} style={{ backgroundColor: color }} >
            <div>{toasterMsg}</div>
            <b onClick={closeToaster}>X</b>
            <div style={{ width }}></div>
        </div>
    )
}
