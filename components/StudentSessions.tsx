import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Link,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { add_session } from '../redux/actions/addSessionActions';

export interface StudentSessionsProps {
    data: IStudentSess[] | undefined;
}

export interface IStudentSess {
    course: {
        comment: string | undefined;
        dateEnd: Date | null;
        dateStart: Date;
        status: string | undefined;
        _id: string;
        student: {
            date: Date;
            email: string;
            image: string;
            name: string;
            role: string;
            _id: string;
        };
    };
    date: Date;
    description: string;
    feedback: string;
    videolink: string;
    _id: string;
}

export default function StudentSessions({ data }: StudentSessionsProps) {
    const dispatch = useDispatch();

    const handleShowSession = (id: string, name: string) => {
        dispatch(add_session(id, name));
    };

    return (
        <>
            {data &&
                data.map((row) => (
                    <TableRow key={row._id}>
                        <Link href={`/students/session/${row._id}`}>
                            <Button
                                color="default"
                                onClick={() =>
                                    handleShowSession(
                                        row._id,
                                        row.course.student.name
                                    )
                                }
                            >
                                {row.description} || {row.date}
                            </Button>
                        </Link>
                    </TableRow>
                ))}
            {/* <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Session started</TableCell>
                            <TableCell align="right">Video</TableCell>
                            <TableCell align="right">Feedback</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data.map((row) => (
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
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <hr />
            {data &&
                data.map((el, index) => (
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
                ))} */}
        </>
    );
}
