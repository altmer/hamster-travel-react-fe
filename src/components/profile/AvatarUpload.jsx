import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Dropzone from 'react-dropzone';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactCrop from 'react-image-crop';
import { toast } from 'react-toastify';
import { Translate, Translator } from 'react-translated';

import Loading from '../Loading';
import Avatar from './Avatar';
import { getToken } from '../../store/session';

import 'react-image-crop/dist/ReactCrop.css';
import uploadImg from '../../images/upload.svg';
import './AvatarUpload.css';

const isCropValid = (crop) => crop && crop.width && crop.height;

const AvatarUpload = ({ user }) => {
  const [crop, setCrop] = useState({
    unit: '%',
    aspect: 1,
    width: 30,
  });
  const [cropping, setCropping] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageContent, setImageContent] = useState(null);

  const toggleModal = () => {
    setCropping(!cropping);
    setCrop({
      unit: '%',
      aspect: 1,
      width: 30,
    });
  };

  const onSelect = (files) => {
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      setImageContent(evt.target.result);
      toggleModal();
    };
  };

  const onCropChanged = (crop) => {
    setCrop(crop);
  };

  const upload = (translate) => {
    if (!isCropValid(crop)) {
      toast.error(translate({ text: 'Crop invalid' }));
      return;
    }
    toggleModal();
    setUploading(true);
    const data = new FormData();
    // convert crop to form values
    data.append('user[crop_x]', crop.x);
    data.append('user[crop_y]', crop.y);
    data.append('user[crop_width]', crop.width);
    data.append('user[crop_height]', crop.height);
    data.append('user[avatar]', selectedFile);

    fetch(`${process.env.REACT_APP_VOYAGER_HOST}/upload_avatar`, {
      method: 'put',
      body: data,
      headers: {
        authorization: getToken(),
      },
    })
      .then(() => {
        setUploading(false);
      })
      .catch(() => {
        setUploading(false);
        toast.error(translate({ text: 'Something went wrong' }));
      });
  };

  return (
    <Translator>
      {({ translate }) => (
        <div className="AvatarUpload-outer">
          <Dropzone onDrop={onSelect}>
            {({ getRootProps, getInputProps }) => (
              <div
                className="AvatarUpload"
                {...getRootProps({
                  multiple: false,
                  accept: 'image/*',
                })}
              >
                <Avatar {...user} />
                <div className="AvatarUpload-overlay">
                  <img src={uploadImg} alt="" />
                </div>
                <input {...getInputProps()} />
              </div>
            )}
          </Dropzone>
          {uploading && <Loading />}
          <Modal isOpen={cropping} toggle={toggleModal} size="lg">
            <ModalHeader toggle={toggleModal}>
              <Translate text="Select part of image to upload" />
            </ModalHeader>
            <ModalBody>
              {imageContent && (
                <ReactCrop
                  src={imageContent}
                  crop={crop}
                  onChange={onCropChanged}
                />
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleModal}>
                <Translate text="Cancel" />
              </Button>{' '}
              <Button color="primary" onClick={() => upload(translate)}>
                <Translate text="Upload" />
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      )}
    </Translator>
  );
};

AvatarUpload.propTypes = {
  user: PropTypes.shape({
    color: PropTypes.string,
    initials: PropTypes.string,
  }),
};

AvatarUpload.defaultProps = {
  user: {},
};

export default AvatarUpload;
