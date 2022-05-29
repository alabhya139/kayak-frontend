import * as yup from 'yup';
import DetailsForm from './DetailsForm';
import LongDescriptionForm from './LongDescriptionForm';
import MediaUploadForm from './MediaUploadForm';
import MeetingDetailsForm from './MeetingDetailsForm';

export const eventDetailsInitialValue = {
  name: '',
  description: '',
  category: '',
  expectedFunding: '',
  startDate: ''
};

export const meetingDetailsInitialValue = {
  location: '',
  pitchDate: '',
  meetingUrl: '',
  meetingPassword: ''
};

export const longDescriptionInitialValue = {
  detailedInformation: ''
};

export const mediaUploadInitialValue = {
  highlightingImageVideoURL: ''
};

export const eventDetailsSchema = yup.object().shape({
  name: yup.string().required('Please enter name!'),
  description: yup.string().required('Please enter description'),
  category: yup.string().required('Please select category'),
  expectedFunding: yup.number().required('Expected Funding is required and should be a number'),
  startDate: yup.string()
});

export const meetingDetailsSchema = yup.object().shape({
  location: yup.string().required('Please select meeting location!'),
  pitchDate: yup.string().required('Please select meeting date!'),
  meetingUrl: yup.string().url().required('Please enter a valid meeting url!'),
  meetingPassword: yup.string()
});

export const longDescriptionSchema = yup.object().shape({
  detailedInformation: yup.string().required('Please enter a detailed description og your event!')
});

export const mediaUploadSchema = yup.object().shape({
  highlightingImageVideoURL: yup
    .string()
    .required('Please upload image related to your event to proceed!')
});

export const steps = [
  { label: 'Details', value: 'details' },
  { label: 'Meeting Details', value: 'meeting-details' },
  { label: 'Detailed Description', value: 'detailed-description' },
  { label: 'Media Upload', value: 'media-upload' }
];

export const CATEGORY_OPTION = [
  { label: 'Healthcare', value: 'healthcare', id: '1' },
  { label: 'Finance', value: 'finance', id: '2' }
];

export const LOCATION_OPTION = [
  { label: 'Zoom', value: 'zoom', id: '1' },
  { label: 'Google Meet', value: 'google-meet', id: '2' },
  { label: 'Microsoft Teams', value: 'microsoft-teams', id: '3' }
];

export const FORM_OPTION = [
  {
    initialValue: eventDetailsInitialValue,
    schema: eventDetailsSchema,
    form: DetailsForm
  },
  {
    initialValue: meetingDetailsInitialValue,
    schema: meetingDetailsSchema,
    form: MeetingDetailsForm
  },
  {
    initialValue: longDescriptionInitialValue,
    schema: longDescriptionSchema,
    form: LongDescriptionForm
  },
  {
    initialValue: mediaUploadInitialValue,
    schema: mediaUploadSchema,
    form: MediaUploadForm
  }
];
