import React, { useState } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@material-ui/core';

export interface EditFormProps {
    id: string;
    email: string;
    updateUserList: Function;
}

export const EditForm = ({ id, email, updateUserList }: EditFormProps) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');

    const changeHandlerName = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setName(event.target.value as string);
    };

    const changeHandlerRole = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setRole(event.target.value as string);
    };

    const updateHandler = async () => {
        try {
            const updateUser = {
                name,
                role,
                id,
            };
            const res = await axios.put(
                `${process.env.RESTURL}/api/updateUser`,
                updateUser
            );
            updateUserList();
            setMessage(`${res.data.email} updated`);
            setName('');
            setRole('');
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } catch (e) {
            setMessage(`${e}`);
            setTimeout(() => {
                setMessage('');
            }, 3000);
            return;
        }
    };

    return (
        <React.Fragment>
            <div className="editForm">
                <div>
                    <h3>Edit user: {email}</h3>
                </div>
                <div className="message">
                    <h3>{message}</h3>
                </div>

                <div className="formBlock">
                    <TextField
                        onChange={changeHandlerName}
                        margin="normal"
                        name="name"
                        value={name}
                        type="text"
                        label="name"
                    />
                </div>
                <div className="formBlock">
                    <FormControl>
                        <InputLabel id="select-label">role</InputLabel>
                        <Select
                            labelId="select-label"
                            value={role}
                            onChange={changeHandlerRole}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'admin'}>Admin</MenuItem>
                            <MenuItem value={'tutor'}>Tutor</MenuItem>
                            <MenuItem value={'student'}>Student</MenuItem>
                        </Select>
                    </FormControl>
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
