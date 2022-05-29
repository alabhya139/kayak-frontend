import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import Dropzone from '../../components/Dropzone';
import { useSnackbarContext } from '../../components/Snackbar/context';
import { useUploadContext } from '../../providers/UploadProvider/context';
import { mediaUploadInitialValue } from './constants';
import { FormContainer } from './styles';

function MediaUploadForm() {
  const [file, setFile] = useState<File>();
  const [uploadStatus, setUploadStatus] = useState<boolean>(false);
  const { setFieldValue } = useFormikContext<typeof mediaUploadInitialValue>();
  const { uploadFile } = useUploadContext();
  const {
    ToastService: { showToast }
  } = useSnackbarContext();

  const onFileChangeHandler = async (event: React.ChangeEvent<HTMLInputElement> | undefined) => {
    setUploadStatus(true);
    const selectedFile = event?.target?.files ? event?.target?.files[0] : undefined;
    setFile(selectedFile);
    if (selectedFile) {
      if (uploadFile) {
        try {
          const response = await uploadFile(selectedFile, 'events');
          if (!response?.secure_url) throw response;
          setFieldValue('highlightingImageVideoURL', response?.secure_url);
          showToast(true, 'success', 'File upload success, please proceed further!');
          setUploadStatus(false);
        } catch (error) {
          showToast(true, 'error', 'File upload failed, please try again!');
          setFile(undefined);
          setUploadStatus(false);
        }
      }
    }
  };
  return (
    <FormContainer>
      <Dropzone
        file={file}
        accept="image/*"
        uploadStatus={uploadStatus}
        onChangeHandler={onFileChangeHandler}
      />
    </FormContainer>
  );
}

export default MediaUploadForm;
