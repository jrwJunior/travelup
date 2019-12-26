import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, Marker, TileLayer, GeoJSON } from 'react-leaflet';
import { divIcon } from 'leaflet';
import MapGeo from './map.geo.json';
import { getAllPhotosAndGPSCoordinates, setMapId, setPositionCenterMap } from '../../actions/map_actions';
import { modalOppened } from '../../actions/modal_actions';
import ServiceGeoCoordinates from '../../services/service_geo_cordinats';
import './style.scss';

class Mapleaflet extends Component {
  serviceGeoCoordinates = new ServiceGeoCoordinates();
  map_dark = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  map_light = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

  componentDidMount() {
    this.props.getAllPhotos();
  }

  componentDidUpdate(prevProps, prevState) {
    const { marks } = this.props.map;

    if (marks.length && marks.length !== prevProps.map.marks.length) {
      const _id = marks[marks.length -1].id;

      this.serviceGeoCoordinates.getCords(_id)
        .then(cords => this.props.setCenterMap(cords.latlng));
    }
  }

  handleMouseOver = evt => {
    const ctx = evt.layer;
    const isColor = this.props.colorTheme === 'dark' ? '#323232' : '#fffdf9';
    const isOpacity = this.props.colorTheme === 'dark' ? 0.35 : 0.65;

    ctx.setStyle({
      weight: 0,
      fillColor:  isColor,
      fillOpacity: isOpacity,
    })
  }

  handleMouseOut = evt => {
    evt.target.resetStyle(evt.layer);
  }

  mapCustomMarkIcon = id => {
    const { images } = this.props;
    const items = images[id];

    return divIcon({
      html: `
        <img src=${ items[0].src } alt='preview photo'>
        <span class='marker-quantity'>${ items.length }</span>  
        `,
      className: 'iconButtonAddPhoto',
      iconAnchor: [20, 40],
      iconSize: [40, 40]
    });
  }

  mapLayerStyled() {
    return {
      fill: true,
      fillColor: 'transparent',
      weight: 0,
      width: 100
    }
  }

  filterCountryId = evt => {
    const { options } = evt.target;
    const { map, showModal, selectCountry } = this.props;

    map.marks.forEach(item => {
      if (item.id.includes(options.position.id)) {
        selectCountry(options.position.id);
        showModal('gallery', null);
      }
    });
  }

  selectedCountry = evt => {
    const { map, selectCountry, showModal } = this.props;
    const { id } = evt.layer.feature;

    if (!map.marks.some(item => item.id === id)) {
      selectCountry(evt.layer.feature.id);
      showModal('gallery', null);
    } else {
      evt.originalEvent.stopPropagation();
    }
  }

  render() {
    const { map, colorTheme } = this.props;
    const position = [this.props.map.lat, this.props.map.lng];

    return (
      <Map
        className='app-map'
        center={ position }
        zoom={ 3 }
        maxBounds={ [[90, -180], [-70, 180]] }
      >
        <TileLayer
          url={ colorTheme === 'dark' ? this.map_dark : this.map_light }
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
            key={ cords.id }
            position={ cords }
            icon={ this.mapCustomMarkIcon(cords.id) }
            onClick={ evt => this.filterCountryId(evt)}
          />
        ))}
      </Map>
    )
  }
}

const mapStateToProps = ({ map, gallery, theme }) => {
  return {
    images: gallery.photos,
    colorTheme: theme.colorTheme,
    map
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllPhotos: () => dispatch(getAllPhotosAndGPSCoordinates()),
    setCenterMap: cords => dispatch(setPositionCenterMap(cords)),
    showModal: (id, body) => dispatch(modalOppened(id, body)),
    selectCountry: id => dispatch(setMapId(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Mapleaflet);