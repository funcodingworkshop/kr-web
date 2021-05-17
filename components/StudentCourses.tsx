import React from 'react';
import Link from 'next/link';
import VisibilityIcon from '@material-ui/icons/Visibility';
import StudentSessions from '../components/StudentSessions';
import KrCoursesSession from '../models/krCoursesSession';
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

export default function StudentCourses({ data }: any) {
    console.log('!!!2222', data);
    const handleShowSession = (id: string) => {
        // dispatch(add_session(id, name));
        console.log('show sessions', id);
    };
    return (
        <>
            <TableContainer component={Paper}>
                {' '}
                <Table aria-label="simple table">
                    {' '}
                    <TableHead>
                        {' '}
                        <TableRow>
                            {' '}
                            <TableCell align="right">Course started</TableCell>
                            {/* <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Comments</TableCell>
                            <TableCell align="right">Show sessions</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data.map((row: any) => (
                                <TableRow key={row._id}>
                                    <TableCell align="right">
                                        {row.dateStart}
                                    </TableCell>

                                    {/* <TableCell align="right">
                                        {row.status}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.comment}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Link
                                            as={`/students/sessions/${row._id}`}
                                            href="/students/sessions/[student_sessions]"
                                        >
                                            <IconButton
                                                color="primary"
                                                aria-label="show session"
                                                component="span"
                                                onClick={() =>
                                                    handleShowSession(row._id)
                                                }
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                        </Link>
                                    </TableCell> */}

                                    <TableCell align="right">
                                        <StudentSessions
                                            data={data}
                                        ></StudentSessions>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
