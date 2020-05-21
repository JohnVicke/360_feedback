import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import {
    Grow,
    Box,
    Card,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Container,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { GetAllTemplates } from '../../utils/API';
import history from '../../utils/history';

const MyCard = styled(Card)({
    background: '#222222',
    border: 0,
    borderRadius: 15,
    color: 'white',
    height: 600,
    width: 1200,
    textAlign: 'center',
});
const ContinueButton = styled(Button)({
    // backgroundColor: '#4392FE',
    // border: 0,
    // color: 'white',
    // marginTop: '18rem',
    // borderRadius: 30,
    // height: '40px',
    // width: '125px',
    // float: 'right',
    // transition: 'ease-in-out 0.2s',
    // marginRight: '4rem'
});
const BackButton = styled(Button)({
    backgroundColor: 'transparent',
    border: '1px solid #4392FE',
    color: 'white',
    marginTop: '18rem',
    borderRadius: 30,
    height: '40px',
    width: '125px',
    transition: 'ease-in-out 0.2s',
    marginLeft: '4rem',
});

class SelectTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                given_name: '',
                family_name: '',
            },
            templates: [
                {
                    _id: 1,
                    name: 'May evaluation',
                    sections: [{ name: 'Trust' }, { name: 'Healthy conflict' }],
                },
                {
                    _id: 2,
                    name: 'Wierd evaluation',
                    sections: [{ name: 'Random' }, { name: 'Nalle Puh' }],
                },
            ],
            radioValue: '',
        };
    }

    componentDidMount = async () => {
        const { user } = this.props.location.state;

        const response = await (await GetAllTemplates()).data;

        this.setState({
            user: user,
            templates: response.data,
            radioValue: response.data[0].name,
        });

        if (this.state.templates.length !== 0) {
            this.setState({ radioValue: this.state.templates[0].name });
        }
    };

    handleChange = async (event) => {
        this.setState({ radioValue: event.target.value });
    };

    getTemplateByName = (name) => {
        const template = this.state.templates.find(
            (template) => template.name == name
        );
        return template;
    };

    render() {
        function Sections(props) {
            if (props.value !== '') {
                for (var i = 0; i < props.templates.length; i++) {
                    if (props.templates[i].name === props.value) {
                        return (
                            <Box
                                display='flex'
                                flexDirection='row'
                                style={{ marginLeft: '4rem' }}
                            >
                                {props.templates[i].sections.map(function (
                                    section,
                                    index
                                ) {
                                    return (
                                        <h4
                                            style={{
                                                marginRight: '2rem',
                                                fontFamily: 'Source Sans Pro',
                                                fontWeight: 400,
                                            }}
                                        >
                                            {section.name}
                                        </h4>
                                    );
                                })}
                            </Box>
                        );
                    }
                }
                return <h1>Hello!</h1>;
            } else {
                return <h1>Good bye!</h1>;
            }
        }
        return (
            <div className='background'>
                <NavBar />

                <Typography
                    style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: '24px',
                        fontFamily: 'Source Sans Pro',
                        fontWeight: '400',
                        textTransform: 'uppercase',
                        marginTop: '0.5rem',
                    }}
                >
                    <strong>CREATING EVALUATION FOR:</strong>{' '}
                    {this.state.user.given_name +
                        ' ' +
                        this.state.user.family_name}
                </Typography>
                <hr style={{ width: '1200px' }} />

                <Grow in={true}>
                    <Box display='flex' flexDirection='row'>
                        <MyCard
                            style={{
                                marginRight: 'auto',
                                marginLeft: 'auto',
                                marginTop: '2rem',
                            }}
                        >
                            <Typography
                                style={{
                                    color: '#fff',
                                    fontSize: '24px',
                                    fontFamily: 'Source Sans Pro',
                                    fontWeight: '500',
                                    marginTop: '2rem',
                                    textAlign: 'left',
                                    marginLeft: '4rem',
                                }}
                            >
                                Select template
                            </Typography>
                            <FormControl
                                component='fieldset'
                                style={{
                                    float: 'left',
                                    marginLeft: '4rem',
                                }}
                            >
                                <FormLabel component='legend'></FormLabel>
                                <RadioGroup
                                    row
                                    value={this.state.radioValue}
                                    onChange={this.handleChange}
                                >
                                    {this.state.templates.map(function (
                                        template,
                                        index
                                    ) {
                                        return (
                                            <FormControlLabel
                                                value={template.name}
                                                control={<Radio />}
                                                label={template.name}
                                            />
                                        );
                                    })}
                                </RadioGroup>
                            </FormControl>
                            <hr style={{ display: 'none' }}></hr>
                            <Typography
                                style={{
                                    color: '#fff',
                                    fontSize: '20px',
                                    fontFamily: 'Source Sans Pro',
                                    fontWeight: '500',
                                    marginTop: '4rem',
                                    textAlign: 'left',
                                    marginLeft: '4rem',
                                }}
                            >
                                Sections
                            </Typography>
                            <Sections
                                value={this.state.radioValue}
                                templates={this.state.templates}
                            ></Sections>
                            <Button
                                variant='contained'
                                style={{
                                    float: 'right',
                                    backgroundColor: '#4392FE',
                                    color: '#FFFFFF',
                                    borderRadius: '20px',
                                    marginTop: '18rem',
                                    marginRight: '4rem',
                                }}
                                onClick={() =>
                                    history.push({
                                        pathname: '/selectEvaluators',
                                        state: {
                                            user: this.state.user,
                                            template: this.getTemplateByName(
                                                this.state.radioValue
                                            ),
                                        },
                                    })
                                }
                            >
                                Continue
                            </Button>
                            <BackButton
                                onClick={() => history.goBack()}
                                style={{ float: 'left' }}
                            >
                                Back
                            </BackButton>
                        </MyCard>
                    </Box>
                </Grow>
            </div>
        );
    }
}

export default SelectTemplate;
