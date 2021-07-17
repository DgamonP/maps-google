
import React, { useState } from 'react';
import { CardMedia, IconButton } from '@material-ui/core';
import { C_TEXTFIELD } from '../../../components';
import VisibilityIcon from '@material-ui/icons/Visibility';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

export const FieldFileInput = (props) => {

  const [photo, setPhoto] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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
    const targetFile = e.target.files[0];
    if (targetFile) {
      const val = await getBase64(targetFile);
      input.onChange(val);
      setPhoto(URL.createObjectURL(targetFile));
    } else {
      input.onChange(null);
      setPhoto(null);
    }
  };

  function openImage() {
    setIsOpen(true);
  }

  function onComponentImage() {
    if ( photo && isOpen ) {
      return (
        <Lightbox
          mainSrc={photo}
          onCloseRequest={() => setIsOpen( false )}
        />
      );
    }
    return null;
  }

  return (
    <>
      { onComponentImage() }
      {photo && 
        <CardMedia 
          style={{ width: 150, height: 150, margin: 'auto', marginTop: 10, marginBottom: 10, cursor: 'pointer' }} 
          image={photo} 
          onClick={openImage}
        />}
      {/* <input type='file' onChange={onFileChange} /> */}
      <C_TEXTFIELD 
        type={"file"}
        label={"Imagen"}
        style={{ marginTop: 20, }}
        onChange={onFileChange}
        InputLabelProps={{
          shrink: true,
        }}
        suffix={
          photo &&
          <IconButton
            size='small'
            title='Ver imagen'
            onClick={openImage}
          >
            <VisibilityIcon color={"primary"} />
          </IconButton>
        }
      />
    </>
  );
};
