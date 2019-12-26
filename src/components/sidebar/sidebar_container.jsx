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
    const { showModal, selectCountry } = this.props;

    selectCountry(id);
    showModal('gallery', null);
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
        isEmpty={ this.props.isEmpty }
      />
    )
  }
}

const mapStateToProps = ({ gallery, user }) => {
  return {
    images: gallery.photos,
    isEmpty: user.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showModal: (id, body) => dispatch(modalOppened(id, body)),
    selectCountry: id => dispatch(setMapId(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(SidebarContainer);