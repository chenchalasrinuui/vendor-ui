import React from 'react'

export const Input = ({ hanldeChange, lbl, isRequired, value, name, type, isDisabled, errorMsg, lblCols, inputCols, errMsgCols, placeholder }) => {
    return <div className='row mb-3'>
        <div className={`col-sm-${lblCols} text-end`}>
            <b>{lbl}{isRequired && <span className='text-danger'>*</span>}:</b>
        </div>
        <div className={`col-sm-${inputCols}`}>
            <input placeholder={placeholder} disabled={isDisabled} value={value} onChange={hanldeChange} name={name} type={type} className='form-control' />
        </div>
        <div className={`col-sm-${errMsgCols}`}>
            {errorMsg && <b className='text-danger'>{errorMsg}</b>}
        </div>
    </div>

}
