import React from 'react';
import { Alert } from 'react-bootstrap';

function Message({  variant, children   }) { // Variant determina el color
    return (
        <Alert variant={variant}> 
            {children}
        </Alert>
    )
}

export default Message;