import { useSession } from 'next-auth/client';
import { useDispatch } from 'react-redux';
import { updateUserAC, updateLoaderAC } from '../redux/actions/appActions';

export default function Layout({ children }: any) {
  const [session, loading] = useSession();
  const dispatch = useDispatch();

  if (loading) {
    return <>Loading...</>;
  }

  if (session) {
    dispatch(updateUserAC(session.user.email));
    dispatch(updateLoaderAC(true));
  }

  if (!session) {
    return (
      <>
        <h1>You are not authorized</h1>
      </>
    );
  }

  return <div>{children}</div>;
}
