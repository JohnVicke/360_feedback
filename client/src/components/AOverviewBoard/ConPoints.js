import React, { Component } from 'react';
import {
    Box,
    Card,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const MyCard = styled(Card)({
    background: '#EEEEEE',
    border: 0,
    borderRadius: 5,
    color: 'black',
    height: 100,
    width: 325,
    textAlign: 'center',
});
class ConPoints extends Component {
    render() {
        return this.props.component.state.template.sections.map((section) => {
            return (
                <MyCard
                    style={{
                        marginLeft: '5rem',
                    }}
                >
                    <Typography
                        style={{
                            fontFamily: 'Source Sans Pro',
                            fontSize: '18px',
                            fontWeight: '700',
                            color: '#262E3F',
                            lineHeight: '15px',
                            marginTop: '0.3rem',
                            marginBottom: '0',
                        }}
                    >
                        {section.name}
                    </Typography>
                    <hr
                        style={{
                            width: '50%',
                            color: '#CECECE',
                            margin: '5px auto 0 auto',
                        }}
                    ></hr>
                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        margin="0 1rem 0 1rem"
                    >
                        <Box>
                            <p
                                style={{
                                    margin: '0',
                                    fontFamily: 'Source Sans Pro',
                                }}
                            >
                                Colleagues
                            </p>
                            <h1
                                style={{
                                    fontSize: '30px',

                                    margin: '0',
                                    color: 'black',
                                }}
                            >
                                3
                            </h1>
                        </Box>
                        <Box>
                            <p
                                style={{
                                    margin: '0',
                                    fontFamily: 'Source Sans Pro',
                                }}
                            >
                                You
                            </p>
                            <h1
                                style={{
                                    fontSize: '30px',

                                    margin: '0',
                                    color: 'black',
                                }}
                            >
                                5
                            </h1>
                        </Box>
                        <Box>
                            <p
                                style={{
                                    margin: '0',
                                    fontFamily: 'Source Sans Pro',
                                }}
                            >
                                Difference
                            </p>
                            <h1
                                style={{
                                    fontSize: '30px',

                                    margin: '0',
                                    color: 'black',
                                }}
                            >
                                -2
                            </h1>
                        </Box>
                    </Box>
                </MyCard>
            );
        });
    }
}

export default ConPoints;
