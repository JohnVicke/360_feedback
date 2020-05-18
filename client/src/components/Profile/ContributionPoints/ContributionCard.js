import React, { useState } from 'react';
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

    const overallStyle = {
        paper: {
            backgroundColor: '#EEEEEE',
            marginRight: '2rem',
            height: '122px',
        },

        box: {
            p: {
                fontFamily: 'Source Sans pro',
                fontSize: '18px',
                fontWeight: '700',
                textTransform: 'uppercase',
                color: '#262E3F',
            },

            h1: {
                fontSize: '36px',
                fontWeight: '700',
            },
        },
    };

    const cardStyle = {
        paper: {
            marginTop: '1rem',
            backgroundColor: '#EEEEEE',
            marginRight: '2rem',
            height: '90px',
            paddingBottom: '1rem',
        },
        box: {
            p: {
                color: '#262E3F',
                fontFamily: 'Source Sans Pro',
                fontSize: '14px',
                fontWeight: '400',
                textTransform: 'uppercase',
            },
        },
    };

    return (
        <div>
            <Paper
                style={
                    section === 'Overall' ? overallStyle.paper : cardStyle.paper
                }
            >
                <Box display='flex' flexDirection='row'>
                    <Box style={{ padding: '0 1rem' }}>
                        <p
                            style={
                                section === 'Overall'
                                    ? overallStyle.box.p
                                    : cardStyle.box.p
                            }
                        >
                            {section}
                        </p>
                        <h1
                            style={{
                                fontSize:
                                    section === 'Overall' ? '36px' : '26px',
                                color: getColor(overall),
                            }}
                        >
                            {overall}
                        </h1>
                    </Box>
                    <hr
                        style={{
                            margin: 'auto 1rem auto 0.5rem',
                            height: '5rem',
                            border: '1px solid #CECECE',
                        }}
                    />
                    {Object.keys(cardInfo).map((x) => (
                        <Box key={x} style={{ marginRight: '2rem' }}>
                            <p
                                style={
                                    section === 'Overall'
                                        ? overallStyle.box.p
                                        : cardStyle.box.p
                                }
                            >
                                {x}
                            </p>
                            <h2
                                style={{
                                    paddingTop:
                                        section === 'Overall'
                                            ? '0.5rem'
                                            : '2px',
                                    fontSize:
                                        section === 'Overall' ? '28px' : '22px',
                                    color: getColor(cardInfo[x]),
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
