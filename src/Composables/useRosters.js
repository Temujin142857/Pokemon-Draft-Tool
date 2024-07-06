import { createTeam } from './useTeams.js';

export const createRoster = (name, species=[], team=null) => {
    if (!team && species.length > 6) {
        team = createTeam('', species.splice(0, 6));
    } else {
        team = team || createTeam();
    }

    return {
        name,
        species,
        team
    };
};
