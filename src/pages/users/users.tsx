import React from 'react';
import {
  CircularProgress,
  Grid,
  Typography
} from '@mui/material';
import { fetchAPI } from 'lib/api';
import { IUser } from 'models/user';
import Layout from 'layouts/default-layout';
import UserCard from 'components/user-card';

const Users: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [users, setUsers] = React.useState<IUser[]>([]);

  React.useEffect(() => {
    setLoading(true);

    fetchAPI('/people')
      .then((res: any) => {
        setLoading(false);
        setUsers(res);
      });
  }, []);

  return (
    <Layout>
      <div>
        <Typography variant="h2" sx={{ marginBottom: 4 }}>Users</Typography>

        <Grid container gap={ 4 }>
          { loading && !users && <CircularProgress size={ 60 } sx={{ position: 'relative', left: '50%', transform: 'translate(-50%, 0)', color: 'common.black' }} /> }
          
          { users.length > 0 && (
            users.map((user, i) => {
              return (
                <Grid key={ i } item xs={ 12 }><UserCard user={ user } /></Grid>
              );
            })
          ) }

          { !loading && users.length === 0 && (
            <Typography component="p" variant="h5" sx={{ width: '100%', textAlign: 'center', fontStyle: 'italic' }}>Nothing Found</Typography>
          ) }
        </Grid>
      </div>
    </Layout>
  );
};

export default Users;