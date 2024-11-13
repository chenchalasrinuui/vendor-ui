import React from 'react'
import styles from './AppForm.module.css'

export const AppForm = ({ setShowForm, children }) => {
    return (<>
        <div className={styles.formMask}></div>
        <div>
            <div onClick={() => setShowForm(false)} className={`${styles.close} `}>X</div>
            <div className={`${styles.formContainer} mt-4 container-fluid`}>
                {children}
            </div>

        </div>
    </>
    )
}

