import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography
} from '@mui/material';
import {
  KeyboardArrowRight as ArrowRight
} from '@mui/icons-material';
import { IMovie } from 'models/movie';

interface IProps {
  movie: IMovie;
}

const UserCard: React.FC<IProps> = ({ movie }) => {
  const {
    name,
    image,
    stars
  } = movie;

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={ image }
        alt={ name }
      />
      <CardContent>
        <Typography gutterBottom variant="h5" sx={{ fontWeight: 300 }}>{ name }</Typography>
        <Rating value={ stars } readOnly />
      </CardContent>
    </Card>
  );
};

export default UserCard;