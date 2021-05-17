import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { IconButton } from '@material-ui/core';
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
    const handleShowSession = (id: string) => {
        // dispatch(add_session(id, name));
        console.log('show sessions', id);
    };
    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell align="right">Description</TableCell> */}

                            <TableCell align="right">Session started</TableCell>

                            {/* <TableCell align="right">Video</TableCell>
                            <TableCell align="right">Feedback</TableCell>
                            <TableCell align="right">Session detail</TableCell> */}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data &&
                            data.map((row) => (
                                <TableRow key={row._id}>
                                    {/* <TableCell align="right">
                                        {row.description}
                                    </TableCell> */}

                                    <TableCell align="right">
                                        {row.date}
                                    </TableCell>

                                    {/* <TableCell align="right">
                                        {row.videolink}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.feedback}
                                    </TableCell> */}

                                    <TableCell align="right">
                                        <Link
                                            as={`/students/session/${row._id}`}
                                            href="/students/session/[sess]"
                                        >
                                            <IconButton
                                                color="primary"
                                                aria-label="show session"
                                                component="span"
                                                onClick={() =>
                                                    handleShowSession(row._id)
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

            <hr />
        </>
    );
}
