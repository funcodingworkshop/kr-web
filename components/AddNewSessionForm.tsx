import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, TextareaAutosize } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../redux/reducers';
import { createNewMsg } from '../redux/actions/notificationAction';
import Router from 'next/router';

export const AddNewSessionForm = () => {
    const dispatch = useDispatch();

    const [description, setDescription] = useState('');
    const [feedback, setFeedback] = useState('');
    const [videolink, setVideolink] = useState('');

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
            dispatch(
                createNewMsg({
                    message: `${name}'s session added`,
                    msgType: 'success',
                })
            );
            setDescription('');
            setFeedback('');
            setVideolink('');
            setTimeout(() => {
                dispatch(createNewMsg([]));
            }, 4000);
            Router.push(`/tutor/session/${id}`);
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
                <div>
                    <h3>Session student: {name}</h3>
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
