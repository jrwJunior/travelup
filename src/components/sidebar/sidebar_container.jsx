import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setMapId } from '../../actions/map_actions';
import { modalOppened } from '../../actions/modal_actions';
import Sidebar from './sidebar';

class SidebarContainer extends Component {
  state = {
    isFoundCountry: ''
  }

  handleFindCountry = evt => {
    const label = evt.target.value.trim();

		this.setState({
      isFoundCountry: label.toLowerCase()
		});
  }

  handleSelectCountry = id => {
    const { toggleModal, selectCountry } = this.props;

    selectCountry(id);
    toggleModal('modal_gallery');
  }

  сountVisited = id => {
    const { images } = this.props;

    if (images.hasOwnProperty(id)) {
      const items = images[id];
      const itemLast = items[items.length-1];

      return (
        <div className='count-visited-pic'>
          <span style={{ backgroundImage: `url(${ itemLast.src })` }} />
        </div>
      )
    }
  }

  render() {
    return (
      <Sidebar
        onFindCountry={ this.handleFindCountry }
        onSelectCountry={ this.handleSelectCountry }
        onCountVisited={ this.сountVisited }
        isCountry={ this.state.isFoundCountry }
      />
    )
  }
}

const mapStateToProps = ({ gallery }) => {
  return {
    images: gallery
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: (id) => dispatch(modalOppened(id)),
    selectCountry: id => dispatch(setMapId(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SidebarContainer);