import React, { useState, useEffect } from 'react';
import { CardMedia, IconButton } from '@material-ui/core';

import VisibilityIcon from '@material-ui/icons/Visibility';
import { v4 as uuidv4 } from 'uuid';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { C_TEXTFIELD } from '../../../components';

export const FieldFileInput = (props) => {
  const { path } = props;
  // console.log('path ==>', props);
  const [photo, setPhoto] = useState(path);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (path) {
      setPhoto(path);
    }
  }, [path, setPhoto]);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onFileChange = async (e) => {
    const { input } = props;
    let targetFile = e.target.files[0];

    if (targetFile) {
      const newName = uuidv4().toString();
      targetFile = renameFile(e.target.files[0], newName);
      input.onChange(targetFile);
      setPhoto(URL.createObjectURL(targetFile));
    } else {
      input.onChange(null);
      // setPhoto(null);
    }

    function renameFile(originalFile, newName) {
      return new File([originalFile], newName, {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
      });
    }
  };

  function openImage() {
    setIsOpen(true);
  }

  function onComponentImage() {
    if (photo && isOpen) {
      return <Lightbox mainSrc={photo} onCloseRequest={() => setIsOpen(false)} />;
    }
    return null;
  }
  return (
    <>
      {onComponentImage()}
      {photo && (
        <CardMedia
          style={{
            width: 150,
            height: 150,
            margin: 'auto',
            marginTop: 10,
            marginBottom: 10,
            cursor: 'pointer',
          }}
          image={photo}
          onClick={openImage}
        />
      )}
      {/* <input type='file' onChange={onFileChange} /> */}
      <C_TEXTFIELD
        type={'file'}
        label={'Imagen'}
        style={{ marginTop: 20 }}
        onChange={onFileChange}
        InputLabelProps={{
          shrink: true,
        }}
        suffix={
          photo && (
            <IconButton size='small' title='Ver imagen' onClick={openImage}>
              <VisibilityIcon color={'primary'} />
            </IconButton>
          )
        }
      />
    </>
  );
};
