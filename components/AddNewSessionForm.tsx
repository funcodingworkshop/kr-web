import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, TextareaAutosize } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IRootState } from '../redux/reducers';

export const AddNewSessionForm = () => {
    const [description, setDescription] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('');
    const [videolink, setVideolink] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const changeHandlerDescription = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDescription(event.target.value as string);
    };

    const changeHandlerFeedback = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFeedback(event.target.value as string);
    };
    const changeHandlerVideolink = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setVideolink(event.target.value as string);
    };

    const id = useSelector((state: IRootState) => state.addSession.id);
    const name = useSelector((state: IRootState) => state.addSession.name);

    const addNewSession = async () => {
        try {
            const addNewSession = {
                description,
                videolink,
                feedback,
                id,
                name,
            };

            const res = await axios.post(
                `${process.env.RESTURL}/api/addnewsession`,
                addNewSession
            );
            console.log(res.data);
            setMessage(`${name} session saved`);
            setDescription('');
            setFeedback('');
            setVideolink('');
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
                <div>
                    <h3>Session student: {name}</h3>
                </div>
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
                        onClick={addNewSession}
                    >
                        Add new session
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
