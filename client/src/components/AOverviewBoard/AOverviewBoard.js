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
                        maxWidth="xl"
                    >
                        <Typography style={{ fontSize: '500px' }}>
                            {
                                this.state.template.sections[this.state.index]
                                    .name
                            }
                        </Typography>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                Let Google help apps determine location. This
                                means sending anonymous location data to Google,
                                even when no apps are running.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Disagree
                            </Button>
                            <Button onClick={this.handleClose} color="primary">
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}

export default AOverviewBoard;
