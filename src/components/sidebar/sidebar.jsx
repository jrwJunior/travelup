import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { features } from '../map_leaflet/map.geo.json';
import Item from './sidebar_item';
import './style.scss';

const Sidebar = props => {
  const { 
    isCountry,
    onFindCountry,
    onSelectCountry,
    onCountVisited,
    isEmpty
  } = props;

  return (
    <>
      <div className='app-sidebar-search'>
        <input 
          type="text" 
          className="input-search" 
          placeholder="Search"
          onChange={ onFindCountry }
        />
        <span className="icon-magnifier">
        <svg xmlns="http://www.w3.org/2000/svg" className='svg-icon' viewBox="0 0 56.97 56.97" width="16" height="16">
          <path d="M55.15 51.89l-13.56-14.1A22.93 22.93 0 0 0 46.99 23c0-12.68-10.32-23-23-23s-23 10.32-23 23 10.31 23 23 23c4.76 0 9.3-1.44 13.17-4.16l13.66 14.2a2.98 2.98 0 0 0 4.24.09 3 3 0 0 0 .09-4.24zM23.98 6c9.38 0 17 7.63 17 17s-7.62 17-17 17-17-7.63-17-17 7.63-17 17-17z" />
        </svg>
        </span>
      </div>
      <Scrollbars
        renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}
      >
        <div className='country-items'>
          { features.map(({ properties, id, code }) => {
            if (isEmpty) {
              return (
                <div className='skeletonscreen' key={ id }>
                  <div className='skeletonscreen-textitem'/>
                  <span className='skeletonscreen-picture'/>
                </div>
              )
            }

            // eslint-disable-next-line
            if (properties.name.toLowerCase().indexOf(isCountry) != '-1') {
              return (
                <Item 
                  key={ id }
                  countName={ properties.name }
                  countCode={ code }
                  countId={ id }
                  onSelectCountry={ onSelectCountry }
                  onCountVisited={ onCountVisited }
                />
              )
            }

            return null
          })}
        </div>
      </Scrollbars>
    </>
  )
}

Sidebar.propTypes = {
  onFindCountry: PropTypes.func,
  onSelectCountry: PropTypes.func,
  onCountVisited: PropTypes.func,
  isCountry: PropTypes.string
}

export default Sidebar;