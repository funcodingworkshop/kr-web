import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Layout from '../components/layout';

export default function TestMui({ list }: any) {
    const newList = list.Users;

    return (
        <Layout title="Test Mongo and MUI integration">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Role</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">E-mail</TableCell>
                            <TableCell align="right">
                                Registration date
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newList.map((row: any) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">
                                    {row._id}
                                </TableCell>
                                <TableCell align="right">{row.role}</TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">
                                    {new Date(row.date).toDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    );
}

TestMui.getInitialProps = async () => {
    const resp = await fetch(`${process.env.RESTURL}/api/test_mongoGET`);
    const json = await resp.json();
    return { list: json };
};
