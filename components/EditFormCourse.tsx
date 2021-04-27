import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, TextareaAutosize } from '@material-ui/core';

export interface EditFormCourseProps {
    id: string;
    name: string;
    refreshServerSideProps: Function;
}

export const EditFormCourse = ({
    id,
    name,
    refreshServerSideProps,
}: EditFormCourseProps) => {
    const [status, setStatus] = useState('');
    const [comment, setComments] = useState('');
    const [message, setMessage] = useState('');

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
            refreshServerSideProps();
            setMessage(`${name} updated`);
            setComments('');
            setStatus('');
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
                    <h3>Edit user: {name}</h3>
                </div>
                <div className="message">
                    <h3>{message}</h3>
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
