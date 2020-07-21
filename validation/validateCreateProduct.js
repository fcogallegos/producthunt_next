export default function validateCreateProduct(values) {
    

    let errors = {};

    //validate the username
    if(!values.name) {
        errors.name = "The Name is required";
    }

    //validate the company
    if(!values.company) {
        errors.company = "The Company Name is required";
    }

    //validate the URL
    if(!values.url) {
        errors.url = 'The Product URL is required';
    } else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(values.url) ) {
        errors.url = 'The URL is not valid';
    }

    //validate the description
    if(!values.description) {
        errors.description = "Add a description of your Product";
    }

    return errors;
}