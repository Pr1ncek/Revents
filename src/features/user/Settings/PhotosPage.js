import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Image,
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Card,
  Icon
} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import { toastr } from 'react-redux-toastr';
import 'cropperjs/dist/cropper.css';

import { uploadProfileImage } from '../userActions';

class PhotosPage extends Component {
  state = {
    files: [],
    fileName: '',
    cropResult: null,
    image: {}
  };

  onDrop = files => {
    this.setState({ files: files, fileName: files[0].name });
  };

  uploadImage = async () => {
    try {
      await this.props.uploadProfileImage(
        this.state.image,
        this.state.fileName
      );
      this.resetCrop();
      toastr.success('Success', 'Photo has been uploaded!');
    } catch (error) {
      toastr.error('Error', error.message);
    }
  };

  resetCrop = () => this.setState({ file: [], image: {} });

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') return;

    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob);
      this.setState({ cropResult: imageUrl, image: blob });
    }, 'image/jpeg');
  };

  render() {
    return (
      <Segment>
        <Header dividing size="large" content="Your Photos" />
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header
              color="teal"
              sub
              content="Step 1 - Add Photo"
              style={headerStyles}
            />
            <Dropzone onDrop={this.onDrop} multiple={false}>
              <div style={{ textAlign: 'center', padding: '25px' }}>
                <Icon name="upload" size="huge" />
                <Header content="Drop image here or click to upload" />
              </div>
            </Dropzone>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header
              sub
              color="teal"
              content="Step 2 - Resize image"
              style={headerStyles}
            />
            {this.state.files[0] && (
              <Cropper
                style={{ height: '200px', width: '100%' }}
                src={this.state.files[0].preview}
                ref="cropper"
                aspectRatio={1}
                viewMode={0}
                dragMode="move"
                guides={false}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={this.cropImage}
              />
            )}
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header
              sub
              color="teal"
              content="Step 3 - Preview and Upload"
              style={headerStyles}
            />
            {this.state.files[0] && (
              <div>
                <Image
                  style={{ minHeight: '200px', minWidth: '200px' }}
                  src={this.state.cropResult}
                />
                <Button.Group>
                  <Button
                    style={{ width: '100px' }}
                    positive
                    icon="check"
                    onClick={this.uploadImage}
                  />
                  <Button
                    style={{ width: '100px' }}
                    icon="close"
                    onClick={this.resetCrop}
                  />
                </Button.Group>
              </div>
            )}
          </Grid.Column>
        </Grid>

        <Divider />
        <Header sub color="teal" content="All Photos" style={headerStyles} />

        <Card.Group itemsPerRow={5}>
          <Card>
            <Image src="https://randomuser.me/api/portraits/women/20.jpg" />
            <Button positive>Main Photo</Button>
          </Card>

          <Card>
            <Image src="https://randomuser.me/api/portraits/women/20.jpg" />
            <div className="ui two buttons">
              <Button basic color="green">
                Main
              </Button>
              <Button basic icon="trash" color="red" />
            </div>
          </Card>
        </Card.Group>
      </Segment>
    );
  }
}

const headerStyles = {
  marginBottom: '25px'
};

export default connect(
  null,
  { uploadProfileImage }
)(PhotosPage);
