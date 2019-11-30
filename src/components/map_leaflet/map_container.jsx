import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, Marker, TileLayer, GeoJSON } from 'react-leaflet';
import { divIcon } from 'leaflet';
import MapGeo from './map.geo.json';
import { setMapCoordinates } from '../../actions/map_actions';
import { getGPSCoordinates } from '../../actions/gps_actions';
import { setCountryMapId } from '../../actions/map_actions';
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
    const { uid, cords, getCordsFile, setMapNewCords } = this.props;

    if (uid !== prevProps.uid && !cords.length) {
      getCordsFile(uid);
    }

    if (cords.length !== prevProps.cords.length) {
      cords.forEach(({ GPSLatitude: lat, GPSLongitude: lon, id }) => (
        setMapNewCords({
          lon,
          lat,
          id
        })
      ));
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
    const { map, toggleModal, setCountryId } = this.props;

    map.marks.forEach(item => {
      if (item.id.includes(options.position.id)) {
        setCountryId(options.position.id);
        toggleModal();
      }
    });
  }

  selectedCountry = evt => {
    const { marks } = this.props.map;
    const { id } = evt.layer.feature;

    if (!marks.some(item => item.id === id)) {
      console.log(evt.layer.feature.id);
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
        { map.marks.map(cord => (
          <Marker 
            key={ shortid.generate() }
            position={ cord }
            icon={ this.customIconMarker }
            onClick={ evt => this.filterCountryId(evt)}
          />
        ))}
      </Map>
    )
  }
}

const mapStateToProps = ({ fb, map, gpsCords, gallery }) => {
  return {
    map,
    uid: fb.auth.uid,
    cords: gpsCords.cords,
    gallery: gallery.photos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setMapNewCords: crods => dispatch(setMapCoordinates(crods)),
    getCordsFile: uid => dispatch(getGPSCoordinates(uid)),
    toggleModal: () => dispatch(showModal()),
    setCountryId: id => dispatch(setCountryMapId(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Mapleaflet);