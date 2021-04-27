import React, { useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import { EditFormSession } from './EditFormSession';

export interface SessionListProps {
    course: ISessionsList[] | undefined;
    updateSessionsList: Function;
}

export interface ISessionsList {
    course: {
        comment: string | undefined;
        dateEnd: Date | null;
        dateStart: Date;
        status: string | undefined;
        _id: string;
    };
    date: Date;
    description: string;
    feedback: string;
    videolink: string;
    _id: string;
}

export default function SessionList({
    course,
    updateSessionsList,
}: SessionListProps) {
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState('');

    const handleEdit = (id: string) => {
        setId(id);
        setVisible(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${process.env.RESTURL}/api/deleteSession`, {
                data: id,
            });
            updateSessionsList();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            {visible && (
                <EditFormSession
                    id={id}
                    updateSessionsList={updateSessionsList}
                />
            )}

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Session started</TableCell>
                            <TableCell align="right">Video</TableCell>
                            <TableCell align="right">Feedback</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {course &&
                            course.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell align="right">
                                        {row.description}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.date}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.videolink}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.feedback}
                                    </TableCell>

                                    <TableCell align="right">
                                        <IconButton
                                            color="primary"
                                            aria-label="edit session"
                                            component="span"
                                            onClick={() => handleEdit(row._id)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            color="primary"
                                            aria-label="delete session"
                                            component="span"
                                            onClick={() =>
                                                handleDelete(row._id)
                                            }
                                        >
                                            <DeleteForeverTwoToneIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <hr />
            {course &&
                course.map((el, index) => (
                    <div key={index}>
                        <h1>{el.description}</h1>
                        <h4>{el.date}</h4>
                        <iframe
                            width="560"
                            height="315"
                            src={el.videolink}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))}
        </>
    );
}
