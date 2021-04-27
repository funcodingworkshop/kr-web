import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, TextareaAutosize } from '@material-ui/core';

export interface EditFormSessionProps {
    id: string;
    updateSessionsList: Function;
}

export const EditFormSession = ({
    id,
    updateSessionsList,
}: EditFormSessionProps) => {
    const [description, setDescription] = useState('');
    const [videolink, setVideolink] = useState('');
    const [feedback, setFeedback] = useState('');

    const [message, setMessage] = useState('');

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

            console.log(res.data);
            setMessage(`Session data updated`);
            updateSessionsList();
            setVideolink('');
            setDescription('');
            setFeedback('');
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <React.Fragment>
            <div className="editForm">
                <div className="message">
                    <h3>{message}</h3>
                </div>

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
