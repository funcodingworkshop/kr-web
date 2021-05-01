import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, TextareaAutosize } from '@material-ui/core';
import { createNewMsg } from '../redux/actions/notificationAction';
import { useDispatch } from 'react-redux';

export interface EditFormSessionProps {
    id: string;
    updateSessionsList: Function;
    setVisibility: Function;
}

export const EditFormSession = ({
    id,
    updateSessionsList,
    setVisibility,
}: EditFormSessionProps) => {
    const [description, setDescription] = useState('');
    const [videolink, setVideolink] = useState('');
    const [feedback, setFeedback] = useState('');

    const dispatch = useDispatch();

    const changeHandlerDescription = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDescription(event.target.value as string);
    };

    const changeHandlerVideolink = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setVideolink(event.target.value as string);
    };

    const changeHandlerFeedback = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFeedback(event.target.value as string);
    };

    const updateHandler = async () => {
        try {
            const updateSession = {
                description,
                videolink,
                feedback,
                id,
            };

            const res = await axios.put(
                `${process.env.RESTURL}/api/updateSession`,
                updateSession
            );
            dispatch(
                createNewMsg({
                    message: `Session data has been updated`,
                    msgType: 'success',
                })
            );
            updateSessionsList();
            setVideolink('');
            setDescription('');
            setFeedback('');
            setVisibility();
            setTimeout(() => {
                dispatch(createNewMsg([]));
            }, 4000);
        } catch (e) {
            dispatch(
                createNewMsg({
                    message: e.response.data.message,
                    msgType: 'error',
                })
            );
            setTimeout(() => {
                dispatch(createNewMsg([]));
            }, 4000);
            console.error(e);
        }
    };

    return (
        <React.Fragment>
            <div className="editForm">
                <div className="formBlock">
                    <TextField
                        onChange={changeHandlerDescription}
                        margin="normal"
                        name="description"
                        value={description}
                        type="text"
                        label="description"
                    />
                </div>
                <div className="formBlock">
                    <TextField
                        onChange={changeHandlerVideolink}
                        margin="normal"
                        name="videolink"
                        value={videolink}
                        type="text"
                        label="videolink"
                    />
                </div>

                <div className="formBlock">
                    <TextareaAutosize
                        rowsMin={3}
                        aria-label="feedback"
                        placeholder="Feedback..."
                        id="textarea"
                        value={feedback}
                        onChange={changeHandlerFeedback}
                    />
                </div>
                <div className="formBlock">
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={updateHandler}
                    >
                        Save changes
                    </Button>
                </div>
            </div>
            <style jsx>{`
                .editForm {
                    display: 'flex';
                    background-color: lightgray;
                    margin: 5px;
                }
                .formBlock {
                    margin: 10px;
                }
                .message {
                    color: blue;
                }
            `}</style>
        </React.Fragment>
    );
};
