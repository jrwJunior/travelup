import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, Marker, TileLayer, GeoJSON } from 'react-leaflet';
import { divIcon } from 'leaflet';
import MapGeo from './map.geo.json';
import { getGPSCoordinates } from '../../actions/map_actions';
import { setMapId } from '../../actions/map_actions';
import { showModal } from '../../actions/modal_actions';
import shortid from 'shortid';
import './style.scss';

class Mapleaflet extends Component {
  customIconMarker = divIcon({
    html: `<div class="map-marker"><button class="mark-btn"></button></div>`,
    className: 'iconButtonAddPhoto',
    iconAnchor: [15, 40],
    iconSize: [30, 40]
  });

  componentDidUpdate(prevProps, prevState) {
    const { uid, getCordinates } = this.props;

    if (uid !== prevProps.uid) {
      getCordinates(uid);
    }
  }

  handleMouseOver = evt => {
    const ctx = evt.layer;

    ctx.setStyle({
      weight: 0,
      fillColor: '#ffffff',
      fillOpacity: 0.6,
    })
  }

  handleMouseOut = evt => {
    evt.target.resetStyle(evt.layer);
  }

  mapLayerStyled() {
    return {
      fill: true,
      fillColor: 'transparent',
      weight: 0
    }
  }

  filterCountryId = evt => {
    const { options } = evt.target;
    const { map, toggleModal, selectCountry } = this.props;

    map.marks.forEach(item => {
      if (item.id.includes(options.position.id)) {
        selectCountry(options.position.id);
        toggleModal();
      }
    });
  }

  selectedCountry = evt => {
    const { map, selectCountry, toggleModal } = this.props;
    const { id } = evt.layer.feature;

    if (!map.marks.some(item => item.id === id)) {
      selectCountry(evt.layer.feature.id);
      toggleModal();
    } else {
      evt.originalEvent.stopPropagation();
    }
  }

  render() {
    const { map } = this.props;
    const position = [this.props.map.lat, this.props.map.lng];

    return (
      <Map
        className="app-map" 
        center={ position }
        zoom={ 3 }
        maxBounds={ [[90, -180], [-70, 180]] }
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          minZoom={ 3 }
          maxZoom={ 5 }
        />
        <GeoJSON 
          data={ MapGeo } 
          style={ this.mapLayerStyled }
          onMouseOver={ this.handleMouseOver }
          onMouseOut={ this.handleMouseOut }
          onClick={ evt => this.selectedCountry(evt) }
        />
        { map.marks.map(cords => (
          <Marker 
            key={ shortid.generate() }
            position={ cords }
            icon={ this.customIconMarker }
            onClick={ evt => this.filterCountryId(evt)}
          />
        ))}
      </Map>
    )
  }
}

const mapStateToProps = ({ fb, map }) => {
  return {
    map,
    uid: fb.auth.uid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCordinates: uid => dispatch(getGPSCoordinates(uid)),
    toggleModal: () => dispatch(showModal()),
    selectCountry: id => dispatch(setMapId(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Mapleaflet);