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

    return (  );
}
 
export default useValidation;