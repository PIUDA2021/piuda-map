import React, { useState, useEffect, useContext } from 'react';
import styled from '@emotion/styled';
import { RenderAfterNavermapsLoaded, NaverMap, Polyline } from 'react-naver-maps';
import dotenv from 'dotenv';
import { HomeContext } from '../pages/HomePage';

dotenv.config();

const Map = () => {
  const [zoom, setZoom ] = useState(0);

  const { 
    routes,
  } = useContext(HomeContext);

  useEffect(() => {
    setZoom(10);
    const timer = setTimeout(() => {
      // setZoom(10);
    }, 300)
    
    return timer;
  }, []);

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
        defaultCenter={{ lat: 37.3595704, lng: 127.105399 }}
        defaultZoom={10}
      >
        {routes && routes.trafast && (
          <Polyline 
            path={routes.trafast.path.map(([lng, lat]) => new naver.maps.LatLng(lat, lng))}
            // clickable // 사용자 인터랙션을 받기 위해 clickable을 true로 설정합니다.
            strokeColor={'#ff3344'}
            strokeStyle={'solid'}
            strokeOpacity={0.8}
            strokeWeight={4}        
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