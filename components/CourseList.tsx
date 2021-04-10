import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useDispatch } from 'react-redux';
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
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { EditFormCourse } from './EditFormCourse';
import { add_session } from '../redux/actions/addSessionActions';

export default function CourseList({ courses }: any) {
    const dispatch = useDispatch();

    const [visible, setVisible] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>('');

    const handleEdit = (id: string, name: string) => {
        setVisible(true);
        setName(name);
        setId(id);
    };

    const handleDelete = async (id: string) => {
        try {
            axios.delete(`${process.env.RESTURL}/api/deleteCourse`, {
                data: id,
            });
        } catch (e) {
            console.error(e);
        }
    };

    const handleAddSession = (id: string, name: string) => {
        dispatch(add_session(id, name));
    };

    const handleShowSession = (id: string, name: string) => {
        dispatch(add_session(id, name));
    };

    return (
        <>
            {visible && <EditFormCourse id={id} name={name} />}

            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Course started</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Comments</TableCell>
                            <TableCell align="right">Edit data</TableCell>
                            <TableCell align="right">Delete course</TableCell>
                            <TableCell align="right">Add new session</TableCell>
                            <TableCell align="right">Show sessions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses &&
                            courses.map((row: any) => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">
                                        {row.student.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.dateStart}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.status}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.comment}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            color="primary"
                                            aria-label="edit course"
                                            component="span"
                                            onClick={() =>
                                                handleEdit(
                                                    row._id,
                                                    row.student.name
                                                )
                                            }
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            color="primary"
                                            aria-label="delete course"
                                            component="span"
                                            onClick={() =>
                                                handleDelete(row._id)
                                            }
                                        >
                                            <DeleteForeverTwoToneIcon />
                                        </IconButton>
                                    </TableCell>

                                    <TableCell align="right">
                                        <Link href="/tutor/addnewsession">
                                            <IconButton
                                                color="primary"
                                                aria-label="add new session"
                                                component="span"
                                                onClick={() =>
                                                    handleAddSession(
                                                        row._id,
                                                        row.student.name
                                                    )
                                                }
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Link
                                            href={`/tutor/session/${row._id}`}
                                        >
                                            <IconButton
                                                color="primary"
                                                aria-label="show session"
                                                component="span"
                                                onClick={() =>
                                                    handleShowSession(
                                                        row._id,
                                                        row.student.name
                                                    )
                                                }
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}