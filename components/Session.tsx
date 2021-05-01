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

export default function Session({ course }: SessionListProps) {
    console.log('wer', course);
    return (
        <>
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
