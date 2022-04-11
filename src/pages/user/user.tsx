import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  CircularProgress,
  Grid,
  Typography,
  IconButton
} from '@mui/material';
import { fetchAPI } from 'lib/api';
import { IUser } from 'models/user';
import { IMovie } from 'models/movie';
import Layout from 'layouts/default-layout';
import MovieCard from 'components/movie-card';

const User: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<IUser>();
  const [ratedMovies, setRatedMovies] = React.useState<IMovie[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    setLoading(true);

    Promise.all<any>([
      fetchAPI('/people'),
      fetchAPI('/movies')
    ]).then(res => {
      const [users, movies] = res;
      let userId: string | null = null;
      
      if (users) {
        users.map((user: IUser) => {
          if (user.id === id) {
            userId = user.id;
            setUser(user);
          }
        });
  
        setRatedMovies([]);
  
        if (movies) {
          movies.map((movie: IMovie) => {
            fetchAPI(`/rating/${ movie.id }/${ userId }`).then((res: any) => {
              if (res.stars >= 0 && res.stars !== null) {
                movie.stars = res.stars;
    
                setRatedMovies((state: IMovie[]) => {
                  return (
                    [
                      ...state,
                      movie
                    ]
                  );
                });
              }
            });
          });
        }
      } else {
        navigate('/', { replace: true });
      }

      setLoading(false);
    });
  }, []);

  return (
    <Layout>
      <div>
        { loading && !user &&<CircularProgress size={ 160 } sx={{ position: 'fixed', top: 'calc(50% - 80px)', left: 'calc(50% - 80px)', color: 'common.black' }} /> }

        { user && (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <Avatar sx={{ marginRight: 2, width: 60, height: 60 }} />
              
              <Box>
                <Typography variant="h3">
                  { user.name }
                  <Typography component="span" variant="h5" sx={{ marginLeft: 1, fontWeight: 300 }}>({ user.age } years)</Typography>
                </Typography>
              </Box>
            </Box>

            <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: 300 }}>Rated Movies</Typography>

            <Grid container gap={ 4 }>
              { ratedMovies.length > 0 && (
                ratedMovies.map((movie, i) => {
                  return (
                    <Grid key={ i } item xs={ 12 }><MovieCard movie={ movie } /></Grid>
                  );
                })
              ) }

              { ratedMovies.length === 0 && (
                <Typography component="p" variant="h5" sx={{ width: '100%', textAlign: 'center', fontStyle: 'italic' }}>Nothing Found</Typography>
              ) }
            </Grid>
          </>
        ) }
      </div>
    </Layout>
  );
};

export default User;