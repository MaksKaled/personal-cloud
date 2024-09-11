import styled from "styled-components";

export const Container = styled.div`
display:flex;
 width:fit-content;
 flex-wrap:wrap;
`;

export const Item = styled.div`
    margin: 10px;
    width:fit-content
`;


export const  StyledIcon = styled.img`
    width: 50px;
    height: auto;
    display: block;
    background:none;
`;

export const  FileName =  styled.p`
    
    max-width: 100px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
`;