import React, { useState, useEffect } from 'react';


const useValidation = (stateInitial, validate, fn) => {
    
    const [ values, saveValues ] = useState(stateInitial);
    const [ errors, saveErrors ] = useState({});
    const [ submitForm, saveSubmitForm ] = useState(false);

    useEffect(() => {
        if(submitForm) {
            const notErrors = Object.keys(errors).length === 0;

            if(notErrors) {
                fn(); //fn = function that execute in the component
            }
            saveSubmitForm(false);
        }
    }, []);

    //function that execute when the user writes something
    const handleChange = e => {
        saveValues({
            ...values,
            [e.target.name] : e.target.value
        })
    } 

    //function that execute when the user press submit
    const handleSubmit = e => {
        e.preventDefault();
        const errorsValidation = validate(values);
        saveErrors(errorsValidation);
        saveSubmitForm(true);
    }

    return {
        values,
        errors,
        submitForm,
        handleChange,
        handleSubmit
    };
}
 
export default useValidation;