import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, Marker, TileLayer, GeoJSON } from 'react-leaflet';
import { divIcon } from 'leaflet';
import MapGeo from './map.geo.json';
import { getGPSCoordinates } from '../../actions/map_actions';
import { getGalleryPhotos } from '../../actions/gallery_actions';
import { setMapId } from '../../actions/map_actions';
import { modalOppened } from '../../actions/modal_actions';
import shortid from 'shortid';
import './style.scss';

class Mapleaflet extends Component {
  map_dark = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
  map_white = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

  componentDidMount() {
    
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const { uid, getAllPhotos, getCordinates } = this.props;

  //   if (uid !== prevProps.uid) {
  //     Promise.all([
  //       getAllPhotos(uid),
  //       getCordinates(uid)
  //     ])
  //   }
  // }

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
        <img src=${ items[items.length-1].src } alt=''>
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
    const { map, toggleModal, selectCountry } = this.props;

    map.marks.forEach(item => {
      if (item.id.includes(options.position.id)) {
        selectCountry(options.position.id);
        toggleModal('modal_gallery');
      }
    });
  }

  selectedCountry = evt => {
    const { map, selectCountry, toggleModal } = this.props;
    const { id } = evt.layer.feature;

    if (!map.marks.some(item => item.id === id)) {
      selectCountry(evt.layer.feature.id);
      toggleModal('modal_gallery');
    } else {
      evt.originalEvent.stopPropagation();
    }
  }

  render() {
    const { map, images, colorTheme, isEmpty } = this.props;
    const position = [this.props.map.lat, this.props.map.lng];
    const a = Object.keys(images).length === map.marks.length;

    return (
      <Map
        className='app-map'
        center={ position }
        zoom={ 3 }
        maxBounds={ [[90, -180], [-70, 180]] }
      >
        <TileLayer
          url={ colorTheme === 'dark' ? this.map_dark : this.map_white }
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
        { a && map.marks.map(cords => (
          <Marker 
            key={ shortid.generate() }
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
    toggleModal: (id) => dispatch(modalOppened(id)),
    getCordinates: () => dispatch(getGPSCoordinates()),
    getAllPhotos: () => dispatch(getGalleryPhotos()),
    selectCountry: id => dispatch(setMapId(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Mapleaflet);