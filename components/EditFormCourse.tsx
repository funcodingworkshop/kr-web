import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, TextareaAutosize } from '@material-ui/core';
import { createNewMsg } from '../redux/actions/notificationAction';
import { useDispatch } from 'react-redux';

export interface EditFormCourseProps {
    id: string;
    name: string;
    refreshServerSideProps: Function;
    setVisibility: Function;
}

export const EditFormCourse = ({
    id,
    name,
    refreshServerSideProps,
    setVisibility,
}: EditFormCourseProps) => {
    const [status, setStatus] = useState('');
    const [comment, setComments] = useState('');

    const dispatch = useDispatch();

    const changeHandlerStatus = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setStatus(event.target.value as string);
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComments(event.target.value as string);
    };

    const updateHandler = async () => {
        try {
            const updateCourse = {
                status,
                comment,
                id,
            };
            const res = await axios.put(
                `${process.env.RESTURL}/api/updateCourse`,
                updateCourse
            );
            dispatch(
                createNewMsg({
                    message: `${name} course has been updated`,
                    msgType: 'success',
                })
            );
            refreshServerSideProps();
            setComments('');
            setStatus('');
            setTimeout(() => {
                dispatch(createNewMsg([]));
            }, 4000);
            setVisibility();
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
                    <h3>Edit user: {name}</h3>
                </div>

                <div className="formBlock">
                    <TextField
                        onChange={changeHandlerStatus}
                        margin="normal"
                        name="status"
                        value={status}
                        type="text"
                        label="status"
                    />
                </div>
                <div className="formBlock">
                    <TextareaAutosize
                        rowsMin={3}
                        aria-label="comments"
                        placeholder="Comments..."
                        value={comment}
                        onChange={handleChange}
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
