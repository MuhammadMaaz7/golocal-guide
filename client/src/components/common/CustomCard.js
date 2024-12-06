import React from 'react';
import { Card, CardContent, CardActions, Typography } from '@mui/material';

const CustomCard = ({ title, content, actions }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        {actions}
      </CardActions>
    </Card>
  );
};

export default CustomCard;