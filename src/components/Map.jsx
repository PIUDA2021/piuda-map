import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from '@emotion/styled';
import { RenderAfterNavermapsLoaded, NaverMap, Polyline, Marker } from 'react-naver-maps';
import dotenv from 'dotenv';
import { HomeContext } from '../pages/HomePage';
import { fromTM128ToLatLng } from '../utils';

dotenv.config();

const Map = () => {
  const [ center, setCenter ] = useState({ lat: 37.3595704, lng: 127.105399 });
  const departureRef = useRef(null);
  const arrivalRef = useRef(null);
  const [ zoom, setZoom ] = useState(10);
  const countRef = useRef(0);
  const { 
    routes,
    departure,
    arrival,
  } = useContext(HomeContext);

  const handleSetCenter = (latLng) => {
    if (departureRef.current && arrivalRef.current) {
      const lng = (departureRef.current.x + arrivalRef.current.x) / 2;
      const lat = (departureRef.current.y + arrivalRef.current.y) / 2;
      const latLng = new window.naver.maps.LatLng(lat, lng);
      setCenter(latLng);
    } else {
      setCenter(latLng)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (window.naver && window.naver.maps) {
        const resizeEvent = document.createEvent('HTMLEvents');
        resizeEvent.initEvent('resize', true, false);
        window.dispatchEvent(resizeEvent);
      }
      if (countRef.current > 3000) {
        clearInterval(timer);
      }
    }, 100)
    countRef.current += 100;
    setZoom(10);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (departure) {
      const departureLatLng = fromTM128ToLatLng(departure);
      departureRef.current = departureLatLng
      handleSetCenter(departureLatLng);
    }
  }, [departure])

  useEffect(() => {
    if (arrival) {
      const arrivalLatLng = fromTM128ToLatLng(arrival);
      arrivalRef.current = arrivalLatLng
      handleSetCenter(arrivalLatLng);
    }
  }, [arrival]);

  return (
    <Wrapper>
      <RenderAfterNavermapsLoaded
        ncpClientId={process.env.REACT_APP_NAVER_CLOUD_CLIENT_ID} 
        error={<p>Maps Load Error</p>}
        loading={<p>Maps Loading...</p>}
        submodules={["geocoder"]}
      >
      <NaverMap 
        mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
        style={{
          width: '100%',
          height: '100%',
        }}
        zoom={zoom}
        center={center}
        onCenterChanged={center => setCenter(center)}
        onZoomChanged={zoom => console.log(zoom)}
      >
        {routes && routes.trafast && (
          <Polyline 
            path={routes.trafast.path.map(([lng, lat]) => new window.naver.maps.LatLng(lat, lng))}
            // clickable // 사용자 인터랙션을 받기 위해 clickable을 true로 설정합니다.
            strokeColor={'#ff3344'}
            strokeStyle={'solid'}
            strokeOpacity={0.8}
            strokeWeight={4}     
          />
        )}

        {routes && routes.tracomfort && (
          <Polyline 
            path={routes.tracomfort.path.map(([lng, lat]) => new window.naver.maps.LatLng(lat, lng))}
            // clickable // 사용자 인터랙션을 받기 위해 clickable을 true로 설정합니다.
            strokeColor={'#223344'}
            strokeStyle={'solid'}
            strokeOpacity={0.8}
            strokeWeight={4}        
          />
        )}
        {departureRef.current && (
          <Marker 
            position={departureRef.current}
          />
        )}
        {arrivalRef.current && (
          <Marker 
            position={arrivalRef.current}
          />
        )}
      </NaverMap>
    </RenderAfterNavermapsLoaded>
  </Wrapper>
  )
}

export default Map;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;