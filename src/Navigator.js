import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'
import {Roster} from "./DataStructures/Roster";


function NavigateToMatchup({ rostersSelected, path }) {
    const navigate = useNavigate();
    const param=[rostersSelected[0].toJSON(), rostersSelected[1].toJSON()];
    useEffect(() => {
        navigate(path, { state: { param } });
    }, [navigate, path, rostersSelected]);

    return null;
}

export default NavigateToMatchup;