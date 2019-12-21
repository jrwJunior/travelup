import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateUserData } from '../../actions/user_actions';
import { modalOppened } from '../../actions/modal_actions';
import { setCropZoomPhoto } from '../../actions/cropper_actions';
import Cropper from 'react-avatar-editor';
import InputRange from 'react-input-slider';

class EditorPhoto extends Component {
	componentDidUpdate(prevProps, prevState) {
		if (this.props.updatePhoto !== prevProps.updatePhoto) {
			this.props.toggleModal();
		}
	}

	handleZoomSlider = value => {
    this.props.cropZoomPhoto(value);
  };

  handleResetZommSlider = () => {
		this.props.cropZoomPhoto(1);
	};

	handleSave = () => {
		if (this.editor) {
			const canvasScaled = this.editor.getImageScaledToCanvas();

			canvasScaled.toBlob(blob => {
				this.props.updateUserAvatar(blob);
			});
		}
  };
	
	handleCancel = () => {
		this.handleResetZommSlider();
		this.props.toggleModal();
	};
	
	setEditorRef = editor => this.editor = editor;

	render() {
		return (
			<div className="cropper">
				<Cropper
					ref={ this.setEditorRef }
					image={ this.props.cropper.photo }
					width={ 250 }
					height={ 250 }
					border={ 0 }
					borderRadius={ 250 * 2 }
					color={ [255, 255, 255, 0.6] }
					scale={ this.props.cropper.zoom }
					rotate={ 0 }
				/>
				<span className="crop-title">Select an area for your profile photo</span>
				<InputRange 
					axis="x"
					x={ this.props.cropper.zoom }
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

const mapStateToProps = ({ cropper, user }) => {
  return {
		cropper,
		updatePhoto: user.user.userAvatar
  }
}

const mapDispatchToProps = dispatch => {
  return {
		updateUserAvatar: url => dispatch(updateUserData(url)),
		cropZoomPhoto: zoom => dispatch(setCropZoomPhoto(zoom)),
		toggleModal: () => dispatch(modalOppened()),
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