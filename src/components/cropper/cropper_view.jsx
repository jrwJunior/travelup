import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadUserPhoto } from '../../actions/user_actions';
import { showModal } from '../../actions/modal_actions';
import { setCropPhoto, setCropZoomPhoto } from '../../actions/cropper_actions';
import Cropper from 'react-avatar-editor';
import InputRange from 'react-input-slider';

class EditorPhoto extends Component {
	handleZoomSlider = value => {
    this.props.cropZoomPhoto(value);
  };

  handleResetZommSlider = () => {
		this.props.cropZoomPhoto(1);
	};

	handleSave = () => {
    const file = this.fileInput.current.files[0];

		this.props.setUserPhoto(this.props.uid, file);
		this.props.toggleModal();
  };
	
	handleCancel = () => {
		this.handleResetZommSlider();
		this.props.toggleModal();
  };

	render() {
		return (
			<div className="cropper">
				<Cropper
					image={ this.props.cropper.photo }
					width={ 250 }
					height={ 250 }
					border={ 0 }
					borderRadius={ 250 * 2 }
					color={ [255, 255, 255, 0.6] }
					scale={ this.handleZoomSlider }
					rotate={ 0 }
				/>
				<span className="crop-title">Select an area for your profile photo</span>
				<InputRange 
					axis="x"
					x={ this.handleZoomSlider }
					xmin={ 1 }
					xmax={ 10 }
					xstep={ 0.1 }
					onChange={ ({ x }) => this.handleZoomSlider(x) }
				/>
				<div className="crop-controls">
          <button 
            className="crop-control" 
            onClick={ this.handleCancel }
          >
            Cancel
          </button>
          <button 
            className="crop-control" 
            onClick={ this.handleSave }
          >
            Save
          </button>
        </div>
			</div>
		)
	}
}

const mapStateToProps = ({ fb, cropper }) => {
  return {
		uid: fb.auth.uid,
		cropper
  }
}

const mapDispatchToProps = dispatch => {
  return {
		setUserPhoto: (uid, url) => dispatch(uploadUserPhoto(uid, url)),
		cropPhoto: url => dispatch(setCropPhoto(url)),
		cropZoomPhoto: zoom => dispatch(setCropZoomPhoto(zoom)),
		toggleModal: () => dispatch(showModal()),
  }
}

EditorPhoto.propTypes = {
	editorRef: PropTypes.func,
	onChangeZoom: PropTypes.func,
	photoUrl: PropTypes.string,
	rangeZoom: PropTypes.number,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps)(EditorPhoto);