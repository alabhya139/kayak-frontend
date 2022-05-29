import { Box } from '@mui/system';
import { format } from 'date-fns';
import React, { memo } from 'react';
import { Event } from '../../providers/EventsProvider/types';
import { Container, EventDetailWrapper, FundingAmount, Image, StartDate, Title } from './styles';

interface ISearchResultsProps {
  event: Event;
}

function SearchResults({ event }: ISearchResultsProps) {
  const startDate = format(new Date(event.startDate), 'MMM dd, yyyy');
  return (
    <Container>
      <Box sx={{ display: { md: 'flex', sm: 'flex', xs: 'none' } }}>
        <Image src={event.imgUrl} />
      </Box>
      <EventDetailWrapper>
        <Title>{event.name}</Title>
        <FundingAmount>{`₹ ${event.expectedFunding.toLocaleString()}`}</FundingAmount>
        <StartDate>{`Starting From: ${startDate}`}</StartDate>
      </EventDetailWrapper>
    </Container>
  );
}

export default memo(SearchResults);
