import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core';

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
    return (
        <>
            <TableContainer component={Paper}>
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
                ))}
        </>
    );
}
