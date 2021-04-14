import styled from 'styled-components'


export const Input = styled.input`
border:none;
border-bottom:1px solid #777;
background-color:transparent;
opacity:.7;
transition:.2s ease all;
width:75%;
    &:focus {
        outline: none;
        box-shadow: none;
        border-bottom:1px solid black;
    }
    &:hover{
        opacity:1;
    }
    `