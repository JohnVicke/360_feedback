import React from 'react';
import { Paper, Box } from '@material-ui/core';

const ContributionCard = (props) => {
    const cardInfo = props.cardInfo;
    const section = props.section;

    const getOverall = () => {
        var sum = 0;
        var n = 0;
        Object.keys(cardInfo).map((x) => {
            sum += cardInfo[x];
            n++;
        });
        return Math.round((sum / n) * 10) / 10;
    };
    const getColor = (x) => {
        var color = '';
        if (x >= 7.5) color = '#5ABE41';
        else if (x < 7.5 && x > 5) color = '#FFB400';
        else color = '#FE0642';
        return color;
    };
    const overall = getOverall();

    return (
        <div>
            <Paper style={{ backgroundColor: '#EEEEEE', marginRight: '2rem' }}>
                <Box display='flex' flexDirection='row'>
                    <Box
                        display='flex'
                        flexDirection='column'
                        style={{ padding: '0 4rem 0 2rem' }}
                    >
                        <p
                            style={{
                                fontFamily: 'Source Sans Pro',
                                fontWeight: '700',
                            }}
                        >
                            {section}
                        </p>
                        <h1
                            style={{
                                color: getColor(overall),
                            }}
                        >
                            {overall}
                        </h1>
                    </Box>
                    <hr
                        style={{
                            marginRight: '2rem',
                            height: '6rem',
                            marginTop: 'auto',
                            marginBottom: 'auto',
                        }}
                    />
                    {Object.keys(cardInfo).map((x) => (
                        <Box
                            display='flex'
                            flexDirection='column'
                            key={x}
                            style={{ marginRight: '2rem' }}
                        >
                            <p
                                style={{
                                    fontFamily: 'Source Sans Pro',
                                    fontWeight: '700',
                                }}
                            >
                                {x}
                            </p>
                            <h2
                                style={{
                                    color: getColor(cardInfo[x]),
                                    paddingTop: '0.5rem',
                                }}
                            >
                                {cardInfo[x]}
                            </h2>
                        </Box>
                    ))}
                </Box>
            </Paper>
        </div>
    );
};

export default ContributionCard;
