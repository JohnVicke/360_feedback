import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import {
    Box,
    Typography,
    Button,
    Avatar,
    makeStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
} from '@material-ui/core';
import ConPoints from './ConPoints';

const useStyles = makeStyles({
    avatar: {
        height: 120,
        width: 120,
    },
});
class AOverviewBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            index: 0,
            templateName: 'May Evaluation',
            userId: 1,
            survey: {
                _id: 1,
                e_id: 1,
                template_id: 1,
                responses: [
                    {
                        user_id: 1,
                        survey_id: 1,
                        answers: [
                            {
                                q_id: 1,
                                s_id: 1,
                                content: 5,
                                comment: 'Average',
                            },
                            { q_id: 2, s_id: 1, content: 5, comment: 'good!' },
                        ],
                    },
                    {
                        user_id: 2,
                        survey_id: 1,
                        answers: [
                            {
                                q_id: 1,
                                s_id: 1,
                                content: 1,
                                comment: 'Bad',
                            },
                            { q_id: 2, s_id: 1, content: 3, comment: 'good!' },
                        ],
                    },
                ],
            },
            template: {
                sections: [
                    {
                        name: 'Trust',
                        questions: [
                            { content: 'Is #name trustful?', q_id: 1 },
                            { content: 'Is #name trustworthy?', q_id: 2 },
                        ],
                    },
                ],
            },
        };
    }
    Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    handleClickOpen = (index) => {
        this.setState({ dialogOpen: true, index });
    };

    handleClose = () => {
        this.setState({ dialogOpen: false });
    };
    getColor = (x) => {
        var color = '';
        if (x >= 4) color = '#5ABE41';
        else if (x === 3) color = '#FFB400';
        else color = '#FE0642';
        return color;
    };

    render() {
        const comp = this;
        return (
            <div>
                <div className="background">
                    <NavBar />
                    <Typography
                        style={{
                            color: '#fff',
                            fontSize: '24px',
                            fontFamily: 'Source Sans Pro',
                            fontWeight: '400',
                            marginTop: '2rem',
                            marginLeft: '5rem',
                            marginBottom: '2rem',
                        }}
                    >
                        {this.state.templateName} for <br />
                    </Typography>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <Avatar
                            style={{
                                width: '120px',
                                height: '120px',
                                marginLeft: '5rem',
                            }}
                        />
                        <Box
                            display="flex"
                            flexDirection="row"
                            style={{ margin: '0 2rem' }}
                        >
                            <Typography
                                style={{
                                    fontFamily: 'Source Sans pro',
                                    color: '#fff',
                                    fontSize: '38px',
                                    fontWeight: '400',
                                    marginRight: '1rem',
                                }}
                            >
                                Isak Larsson,
                            </Typography>
                            <Typography
                                style={{
                                    fontFamily: 'Source Sans pro',
                                    color: '#fff',
                                    fontSize: '38px',
                                    fontWeight: '700',
                                }}
                            >
                                Developer
                            </Typography>
                        </Box>
                    </Box>
                    <Typography
                        style={{
                            fontFamily: 'Source Sans pro',
                            color: '#fff',
                            fontSize: '24px',
                            fontWeight: '400',
                            marginRight: '1rem',
                            marginLeft: '5rem',
                            marginTop: '3rem',
                            marginBottom: '3rem',
                        }}
                    >
                        Overall contribution points
                    </Typography>
                    <ConPoints component={comp} click={this.handleClickOpen} />
                    <Dialog
                        open={this.state.dialogOpen}
                        TransitionComponent={this.Transition}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                        maxWidth="lg"
                        fullWidth="true"
                    >
                        <Typography
                            style={{
                                fontSize: '45px',
                                textAlign: 'center',
                                fontFamily: 'Source Sans Pro',
                                fontWeight: '600',
                                color: '#262E3F',
                            }}
                        >
                            {
                                this.state.template.sections[this.state.index]
                                    .name
                            }
                        </Typography>
                        <Box
                            display="flex"
                            flexWrap="wrap"
                            alignContent="space-between"
                            margin="0 3rem"
                        >
                            <Box maxWidth="400px">
                                <Typography
                                    style={{
                                        fontSize: '18px',
                                        textAlign: 'Left',
                                        fontFamily: 'Source Sans Pro',
                                        fontWeight: '600',
                                        color: '#262E3F',
                                        marginBottom: '1rem',
                                    }}
                                >
                                    How easy is David to communicate with?
                                </Typography>

                                <Box display="flex" flexDirection="column">
                                    <Box display="flex" flexDirection="row">
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                        >
                                            <Avatar></Avatar>
                                            <Typography
                                                style={{
                                                    fontSize: '14px',
                                                    fontFamily:
                                                        'Source Sans Pro',
                                                    textAlign: 'center',
                                                    fontWeight: '800',
                                                }}
                                            >
                                                YOU
                                            </Typography>
                                        </Box>
                                        <Typography
                                            style={{
                                                fontSize: '40px',
                                                fontFamily: 'Source Sans Pro',
                                                fontWeight: '800',
                                                color: comp.getColor(5),
                                                margin: '0 2rem',
                                                lineHeight: '1',
                                            }}
                                        >
                                            5
                                        </Typography>
                                        <Typography
                                            style={{
                                                fontSize: '12px',
                                                fontFamily: 'Source Sans Pro',
                                                fontWeight: '500',
                                                color: '#262E3F',
                                            }}
                                        >
                                            I think i am very easy to
                                            communicate with.
                                        </Typography>
                                    </Box>
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        style={{ margin: '0.5rem 0' }}
                                    >
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                        >
                                            <Avatar></Avatar>
                                        </Box>
                                        <Typography
                                            style={{
                                                fontSize: '40px',
                                                fontFamily: 'Source Sans Pro',
                                                fontWeight: '800',
                                                color: comp.getColor(3),
                                                margin: '0 2rem',
                                                lineHeight: '1',
                                            }}
                                        >
                                            3
                                        </Typography>
                                        <Typography
                                            style={{
                                                fontSize: '12px',
                                                fontFamily: 'Source Sans Pro',
                                                fontWeight: '500',
                                                color: '#262E3F',
                                            }}
                                        >
                                            Not so great!
                                        </Typography>
                                    </Box>
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        style={{ margin: '0.5rem 0' }}
                                    >
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                        >
                                            <Avatar></Avatar>
                                        </Box>
                                        <Typography
                                            style={{
                                                fontSize: '40px',
                                                fontFamily: 'Source Sans Pro',
                                                fontWeight: '800',
                                                color: comp.getColor(3),
                                                margin: '0 2rem',
                                                lineHeight: '1',
                                            }}
                                        >
                                            3
                                        </Typography>
                                        <Typography
                                            style={{
                                                fontSize: '12px',
                                                fontFamily: 'Source Sans Pro',
                                                fontWeight: '500',
                                                color: '#262E3F',
                                            }}
                                        >
                                            Not so great!
                                        </Typography>
                                    </Box>
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        style={{ margin: '0.5rem 0' }}
                                    >
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                        >
                                            <Avatar></Avatar>
                                        </Box>
                                        <Typography
                                            style={{
                                                fontSize: '40px',
                                                fontFamily: 'Source Sans Pro',
                                                fontWeight: '800',
                                                color: comp.getColor(2),
                                                margin: '0 2rem',
                                                lineHeight: '1',
                                            }}
                                        >
                                            2
                                        </Typography>
                                        <Typography
                                            style={{
                                                fontSize: '12px',
                                                fontFamily: 'Source Sans Pro',
                                                fontWeight: '500',
                                                color: '#262E3F',
                                            }}
                                        >
                                            Not so great!
                                        </Typography>
                                    </Box>
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        style={{ margin: '0.5rem 0' }}
                                    >
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                        >
                                            <Avatar></Avatar>
                                        </Box>
                                        <Typography
                                            style={{
                                                fontSize: '40px',
                                                fontFamily: 'Source Sans Pro',
                                                fontWeight: '800',
                                                color: comp.getColor(4),
                                                margin: '0 2rem',
                                                lineHeight: '1',
                                            }}
                                        >
                                            4
                                        </Typography>
                                        <Typography
                                            style={{
                                                fontSize: '12px',
                                                fontFamily: 'Source Sans Pro',
                                                fontWeight: '500',
                                                color: '#262E3F',
                                            }}
                                        >
                                            Not so great!
                                        </Typography>
                                    </Box>
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        style={{ margin: '0.5rem 0' }}
                                    >
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                        >
                                            <Avatar></Avatar>
                                        </Box>
                                        <Typography
                                            style={{
                                                fontSize: '40px',
                                                fontFamily: 'Source Sans Pro',
                                                fontWeight: '800',
                                                color: comp.getColor(1),
                                                margin: '0 2rem',
                                                lineHeight: '1',
                                            }}
                                        >
                                            1
                                        </Typography>
                                        <Typography
                                            style={{
                                                fontSize: '12px',
                                                fontFamily: 'Source Sans Pro',
                                                fontWeight: '500',
                                                color: '#262E3F',
                                            }}
                                        >
                                            Not so great!
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default AOverviewBoard;
