import React from 'react';
import { Paper, Box, makeStyles } from '@material-ui/core';
import ContributionCard from './ContributionCard';

const summary = {
    work: {
        contribution: 8.2,
        mentoring: 6.4,
        knowledge: 2.1,
    },
    social: {
        inviting: 5.4,
        lunch: 8.2,
        discussion: 5.4,
    },

    dev: {
        frontend: 2.1,
        backend: 9.2,
        errorhandling: 9.3,
    },
};
const ContributionPoints = (props) => {
    return (
        <Box display='flex' flexDirection='row' justifyContent='space-around'>
            {Object.keys(summary).map((section) => (
                <ContributionCard
                    cardInfo={summary[section]}
                    section={section}
                />
            ))}
        </Box>
    );
};

export default ContributionPoints;
