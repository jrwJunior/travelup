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
    onCountVisited
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
        <span className="icon-magnifier" />
      </div>
      <Scrollbars>
        <div className='country-items'>
          { features.map(({ properties, id, code }) => {
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