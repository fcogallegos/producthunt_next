import styled from '@emotion/styled';

const Button = styled.a`
    display: block;
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem; /* .8rem arriba y abajo, 2rem izq y der  */
    margin: 2rem auto;
    text-align: center;
    background-color: ${props => props.bgColor ? '#DA552F' : 'white'};
    color: ${props => props.bgColor ? 'white' : '#000'};
    border-radius: 4px;

    &:last-of-type {
        margin-right: 0;
    }

    &:hover {
        cursor: pointer;
    }
`;

export default Button;