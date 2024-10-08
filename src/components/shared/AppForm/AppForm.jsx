import React from 'react'
import styles from './AppForm.module.css'

export const AppForm = ({ setShowForm, children }) => {
    return (<>
        <div className={styles.formMask}></div>
        <div>
            <div onClick={() => setShowForm(false)} className={styles.close}>X</div>
            {children}
        </div>
    </>
    )
}

