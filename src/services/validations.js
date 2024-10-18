const regEx = {
    "REQUIRED": {
        pattern: /./,
        message: 'Required !!!'
    },
    "EMAIL": {
        pattern: /^[a-zA-Z]{1}[a-zA-Z0-9_./]*@[a-zA-Z]{3,10}\.[a-zA-Z]{2,3}$/,
        message: "Should be in the email format"
    },
    "MIN5CHAR": {
        pattern: /[a-zA-Z0-9]{5,}/,
        message: "Min 5 chars"
    },
    "PHONE": {
        pattern: /^[0-9]{10}$/,
        message: "Exactly 10 digits"
    }
}

function validate(inputObj) {
    inputObj.errorMsg = "";
    for (let val of inputObj?.criteria) {
        const { pattern, message } = regEx[val]
        if (!pattern.test(inputObj?.value)) {
            inputObj.errorMsg = message
            break;
        }
    }
}

export function handleFieldLevelValidation(eve, inputControls, setInputControls) {
    const { name, value } = eve?.target
    const clonedInputControls = JSON.parse(JSON.stringify(inputControls))
    let inputObj = clonedInputControls.find((obj) => {
        return obj.name === name
    })
    inputObj.value = value;
    validate(inputObj)
    setInputControls(clonedInputControls)
}

export function handleFormLevelValidation(inputControls, setInputControls) {
    const clonedInputControls = JSON.parse(JSON.stringify(inputControls))
    const dataObj = {}
    clonedInputControls.forEach((obj) => {
        dataObj[obj.name] = obj.value;
        validate(obj)
    })
    const isInValid = clonedInputControls.some((obj) => obj.errorMsg)
    setInputControls(clonedInputControls)

    return [isInValid, dataObj]
}

export function setFormData(inputControls, setInputControls, data, isEdit, fieldName) {
    const clonedInputControls = JSON.parse(JSON.stringify(inputControls))
    clonedInputControls.forEach((obj) => {
        if (isEdit && obj.name === fieldName) {
            obj.isDisabled = true
        }
        obj.value = data[obj.name]
    })
    setInputControls(clonedInputControls)
}

export function clearFormData() {

}