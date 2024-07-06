import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

function NavigateToMatchup({ rostersSelected, path }) {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(path, { state: { rostersSelected } });
    }, [navigate, path, rostersSelected]);

    return null;
}

export default NavigateToMatchup;