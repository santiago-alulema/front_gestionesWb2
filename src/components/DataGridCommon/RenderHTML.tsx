import React from 'react';
import { styled } from '@mui/material/styles';

const StyledHTML = styled('div')({
    '& strong': {
        fontWeight: 'bold',
    },
    '& em': {
        fontStyle: 'italic',
    },
    // Añade más estilos según necesites
});

interface RenderHTMLProps {
    html: string;
}

const RenderHTML: React.FC<RenderHTMLProps> = ({ html }) => {
    return <StyledHTML dangerouslySetInnerHTML={{ __html: html }} />;
};

export default RenderHTML;