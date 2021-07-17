import ReactS3 from 'react-s3';
import { config } from '../../helpers/amazons3Identity';

const uploadFileService = (file, bucket) => {
  return ReactS3.uploadFile(file, { ...config, dirName: bucket })
    .then((data) => data)
    .catch((err) => err);
};

export const s3Service = {
  uploadFile: uploadFileService,
};
