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

const totalScore = {
    overall: {
        work:
            Math.round(
                (Object.values(summary.work).reduce((a, b) => a + b, 0) /
                    Object.values(summary.work).length) *
                    10
            ) / 10,
        social:
            Math.round(
                (Object.values(summary.social).reduce((a, b) => a + b, 0) /
                    Object.values(summary.social).length) *
                    10
            ) / 10,
        dev:
            Math.round(
                (Object.values(summary.dev).reduce((a, b) => a + b, 0) /
                    Object.values(summary.dev).length) *
                    10
            ) / 10,
    },
};

// TODO: Fixa ghetto lösning
const ContributionPoints = (props) => {
    return (
        <Box display='flex' flexDirection='row' flexWrap='wrap'>
            <ContributionCard
                cardInfo={totalScore.overall}
                section={'Overall'}
            />

            {Object.keys(summary).map((section) => (
                <ContributionCard
                    key={section}
                    cardInfo={summary[section]}
                    section={section}
                />
            ))}
        </Box>
    );
};

export default ContributionPoints;
