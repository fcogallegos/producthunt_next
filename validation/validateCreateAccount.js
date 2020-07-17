export default function validateCreateAccount(values) {
    

    let errors = {};

    //validate the username
    if(!values.name) {
        errors.name = "The Name is required";
    }

    //validate the email
    if(!values.email) {
        errors.email = "The Email is required";
    } else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ) {
        errors.email = "Email is not valid";
    }

    //validate the password
    if(!values.password) {
        errors.password = "The Password is required";
    } else if( values.password.length < 6 ) {
        errors.password = "The Password must be at least 6 characters";
    }

    return errors;
}