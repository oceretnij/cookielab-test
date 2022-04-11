import React from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Card,
  CardHeader,
  IconButton
} from '@mui/material';
import {
  KeyboardArrowRight as ArrowRight
} from '@mui/icons-material';
import { IUser } from 'models/user';

interface IProps {
  user: IUser;
}

const UserCard: React.FC<IProps> = ({ user }) => {
  const {
    id,
    name,
    age,
    photo
  } = user;

  return (
    <Card>
      <CardHeader 
        avatar={ <Avatar sx={{ backgroundColor: 'deepPurple.100' }} /> }
        title={ name }
        subheader= { `${ age } years` }
        action={
          <Link to={ `/user/${ id }` }>
            <IconButton>
              <ArrowRight />
            </IconButton>
          </Link>
        }
      />
    </Card>
  );
};

export default UserCard;