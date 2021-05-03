import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/client';
import { TextField, Button } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Layout from '../../components/layout';
import { ERole } from '../../types/ERole';
import Router from 'next/router';
import { createNewMsg } from '../../redux/actions/notificationAction';
import { useDispatch } from 'react-redux';
import { GetServerSideProps } from 'next';
import { connectDB } from '../../middleware/connectDB';
import KrUser from '../../models/krUser';
import { MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';

type TProps = {};

export interface AddNewCourseProps {
    studentNameList: string | undefined;
}

export interface IStudentNameList {
    name: string;
}

export default function AddNewCourse({ studentNameList }: AddNewCourseProps) {
    const [session, loading] = useSession();

    if (typeof window !== 'undefined' && loading) return null;
    if (!session) {
        return (
            <Layout title="Tutor profile">
                <h1>You must sign in</h1>;
            </Layout>
        );
    }
    if (session.role === ERole.Student) {
        return (
            <Layout title="Tutor profile">
                <h1>You must be an admin or tutor to see this page</h1>;
            </Layout>
        );
    }

    const dispatch = useDispatch();
    const nameList: IStudentNameList[] = JSON.parse(studentNameList);
    const [student, setStudent] = useState('');
    const [selectedDateStart, setSelectedDateStart] = React.useState<Date>(
        new Date()
    );
    const [selectedDateEnd, setSelectedDateEnd] = React.useState<Date>(null);
    const [form, setForm] = useState({
        status: '',
        comment: '',
    });

    const handleDateStartChange = (date: Date) => {
        setSelectedDateStart(date);
    };
    const handleDateEndChange = (date: Date) => {
        setSelectedDateEnd(date);
    };

    const createNewCourse = async (event: FormEvent) => {
        try {
            event.preventDefault();
            const newCourse = {
                selectedDateStart,
                selectedDateEnd,
                student,
                ...form,
            };
            const res = await axios.post(
                `${process.env.RESTURL}/api/addnewcourse`,
                newCourse
            );
            if (res.status === 200) {
                dispatch(
                    createNewMsg({
                        message: `New course created`,
                        msgType: 'success',
                    })
                );
                setTimeout(() => {
                    dispatch(createNewMsg([]));
                }, 4000);
            }
            Router.push('/tutor');
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
            console.error(e.response.data);
        }
    };

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const changeHandlerStudent = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setStudent(event.target.value as string);
    };

    return (
        <Layout title="TutorPage">
            <p>Create new course</p>
            <form onSubmit={createNewCourse}>
                <div className="formBlock">
                    <FormControl>
                        <InputLabel id="select-label">Student</InputLabel>
                        <Select
                            labelId="select-label"
                            value={student}
                            onChange={changeHandlerStudent}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {nameList &&
                                nameList.map((el, index) => (
                                    <MenuItem key={index} value={el.name}>
                                        {el.name}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="start-course"
                            label="Start course"
                            value={selectedDateStart}
                            onChange={handleDateStartChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="finish-course"
                            label="Finish course"
                            value={selectedDateEnd}
                            onChange={handleDateEndChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div>
                    <TextField
                        onChange={changeHandler}
                        name="status"
                        label="status"
                    />
                </div>
                <div>
                    <TextField
                        onChange={changeHandler}
                        name="comment"
                        label="comment"
                    />
                </div>
                <div className="button">
                    <Button variant="outlined" color="secondary" type="submit">
                        Create new course
                    </Button>
                </div>
            </form>
            <style jsx>{`
                .button {
                    margin: 5px;
                }
            `}</style>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    await connectDB();
    try {
        const studentNameList = await KrUser.find({
            role: ERole.Student,
        })
            .select({
                name: 1,
                _id: 0,
            })
            .sort('-name');

        if (!studentNameList) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                studentNameList: JSON.stringify(studentNameList),
            }, // will be passed to the page component as props
        };
    } catch (e) {
        console.error(e);
    }
};
