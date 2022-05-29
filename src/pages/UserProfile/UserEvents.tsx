import { Edit } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { IEvent } from '../../common/Interface/IEvent';
import LargeImageCard from '../../components/LargeImageCard';
import LargeImageCardSkeleton from '../../components/LargeImageCardSkeleton';
import { useSnackbarContext } from '../../components/Snackbar/context';
import { useEventsContext } from '../../providers/EventsProvider/context';
import { getEventStatusByStartDate } from '../../utils/date.utils';

function UserEvents() {
  const { fetchEvents, events } = useEventsContext();

  const [isEventsLoading, setEventsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const skeletonArray = ['item1', 'item2'];
  const {
    ToastService: { showToast }
  } = useSnackbarContext();

  const fetchEventList = useCallback(async () => {
    if (fetchEvents) {
      try {
        setEventsLoading(true);
        await fetchEvents('user-events');
        setEventsLoading(false);
      } catch (error) {
        setEventsLoading(false);
      }
    }
  }, [fetchEvents]);

  useEffect(() => {
    fetchEventList();
  }, [fetchEventList]);

  useEffect(() => {
    if (fetchEvents) fetchEvents('user-events');
  }, [fetchEvents]);

  const handleEdit = (event: IEvent) => {
    const status = getEventStatusByStartDate(event.startDateTimestamp);
    const today = new Date().getTime();
    const difference = (event.startDateTimestamp - today) / (1000 * 3600 * 24);
    if (status !== 'upcoming') {
      showToast(true, 'error', 'Editing past and ongoing events is restricted');
      return;
    }

    if (difference > 2) {
      navigate(`/edit-event/${event._id}`);
    } else {
      showToast(true, 'error', 'Edit events before 2 days of start date is restricted!');
    }
  };
  return (
    <Grid pl={3} container spacing={2}>
      <Grid mb={3} xs={12} sm={6} md={12}>
        <Typography sx={{ pb: 2, fontWeight: 600 }} component="h4" variant="h5" align="left">
          My Events
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        {!isEventsLoading &&
          events.length > 0 &&
          events.map((eventData) => (
            <Grid sx={{ position: 'relative' }} item key={eventData._id} xs={12} sm={6} md={6}>
              <LargeImageCard {...eventData} />
              <Edit
                fontSize="large"
                onClick={() => {
                  handleEdit(eventData);
                }}
                sx={{
                  position: 'absolute',
                  background: '#fff',
                  padding: '8px',
                  top: '32px',
                  right: '16px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              />
            </Grid>
          ))}
        {isEventsLoading &&
          skeletonArray.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={6}>
              <LargeImageCardSkeleton />
            </Grid>
          ))}
        {!isEventsLoading && events.length == 0 && (
          <Grid item key="noevent" xs={12} sm={6} md={6}>
            <Typography variant="subtitle1" gutterBottom component="div">
              No Events To Display.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default UserEvents;
