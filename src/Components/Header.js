import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import '../CSS/Header.css'; // For custom styling

const Header = ({navBarBehaviour}) => {
    const location = useLocation();
    const currentPath = location.pathname;


    const isDisabled = (path) => {
        return true;
        switch(path){
            case "/selectedMatchup":
                return !(currentPath==='/'||currentPath==='/selectedMatchup/selectedMove');
            case "/selectedMatchup/selectedMove":
                return currentPath!=='/selectedMatchup';
        }
    }

    const onLinkClick = (e) => {
        navBarBehaviour[e]();
    }

    return (
        <nav>
            <ul className="ulh">
                <li className="lih">
                    <NavLink
                        to="/"
                        activeClassName="active"
                        className={'nav-button'}
                    >
                        Home
                    </NavLink>
                </li>
                <li className="lih">
                    <NavLink
                        to="/createRoster"
                        activeClassName="active"
                        className={'nav-button'}
                    >
                        Create Roster
                    </NavLink>
                </li>
                <li className="lih">
                    <button
                        className={`nav-button ${isDisabled('/selectedMatchup') ? 'disabled' : ''}`}
                        onClick={()=>onLinkClick(0)}
                        disabled={isDisabled('/selectedMatchup')}
                    >
                        Matchup
                    </button>
                </li>
                <li className="lih">
                    <button
                        className={`nav-button ${isDisabled('/selectedMatchup/selectedMove') ? 'disabled' : ''}`}
                        onClick={()=>onLinkClick(1)}
                        disabled={isDisabled('/selectedMatchup/selectedMove')}
                    >
                        Moves
                    </button>
                </li>
                <li className="lih">
                    <NavLink
                        to="/social"
                        activeClassName="active"
                        className={'nav-button'}
                    >
                        Social
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Header;