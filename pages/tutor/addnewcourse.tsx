import React, { useState } from 'react';
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

type TProps = {};

export default function AddNewCourse(props: TProps) {
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

    const [form, setForm] = useState({
        student: '',
        status: '',
        comment: '',
    });

    const [selectedDateStart, setSelectedDateStart] = React.useState<Date>(
        new Date()
    );

    const [selectedDateEnd, setSelectedDateEnd] = React.useState<Date>(null);

    const handleDateStartChange = (date: Date) => {
        setSelectedDateStart(date);
    };
    const handleDateEndChange = (date: Date) => {
        setSelectedDateEnd(date);
    };

    const createNewCourse = async (event: any) => {
        try {
            event.preventDefault();
            const newCourse = {
                selectedDateStart,
                selectedDateEnd,
                ...form,
            };
            console.log('Submitting form....', newCourse);
            const res = await axios.post(
                `${process.env.RESTURL}/api/addnewcourse`,
                newCourse
            );
            console.log(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    const changeHandler = (event: any) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    return (
        <Layout title="TutorPage">
            <p>Create new course</p>
            <form onSubmit={createNewCourse}>
                <div>
                    <TextField
                        onChange={changeHandler}
                        name="student"
                        label="student"
                    />
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
