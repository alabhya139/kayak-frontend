import { Button, ButtonGroup } from '@mui/material';
import React, { memo } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { grey } from '../../styles/themeColors';

function FilterButton() {
  const filterButtons = [
    {
      value: 'ongoing',
      text: 'Ongoing'
    },
    {
      value: 'upcoming',
      text: 'Upcoming'
    },
    {
      value: 'past',
      text: 'Past'
    }
  ];

  const { status } = useParams();
  return (
    <ButtonGroup>
      {filterButtons.map((filterButton) => (
        <Link key={filterButton.value} to={`/events/${filterButton.value}`}>
          <Button
            sx={{
              borderRadius: '0',
              boxShadow: 'none',
              color: status === filterButton.value ? '#fff' : 'inherit',
              background: status === filterButton.value ? 'primary' : grey[100]
            }}
            variant="contained"
            value={filterButton.value}>
            {filterButton.text}
          </Button>
        </Link>
      ))}
    </ButtonGroup>
  );
}

export default memo(FilterButton);
