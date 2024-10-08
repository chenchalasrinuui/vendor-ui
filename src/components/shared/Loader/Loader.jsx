import React from 'react'
import styles from './Loader.module.css'
import Image from 'next/image'
export const Loader = () => {
    return (<>
        <div className={styles?.loader}>Loader</div>
        <Image src="/loader.gif" alt="loader" width={100} height={100} />
    </>)
}
