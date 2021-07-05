import React, { useState } from 'react';
import styled from '@emotion/styled';
import {  } from '@ionic/react';
import API from '../api';

const SearchResults = ({
  searchResult,
  onSelectResult,
}) => {  
  const results = [
    {
      "title": "<b>은행골</b> 종로구청점",
      "link": "",
      "category": "일식>초밥,롤",
      "description": "",
      "telephone": "",
      "address": "서울특별시 종로구 청진동 2-4",
      "roadAddress": "서울특별시 종로구 종로5길 44",
      "mapx": "310134",
      "mapy": "552711"
    },
    {
      "title": "<b>은행골</b>대학로점",
      "link": "",
      "category": "일식>초밥,롤",
      "description": "",
      "telephone": "",
      "address": "서울특별시 종로구 명륜4가 146-1",
      "roadAddress": "서울특별시 종로구 창경궁로26길 38",
      "mapx": "311859",
      "mapy": "553765"
    },
    {
      "title": "<b>은행골</b>대학로점",
      "link": "",
      "category": "일식>초밥,롤",
      "description": "",
      "telephone": "",
      "address": "서울특별시 종로구 명륜4가 146-1",
      "roadAddress": "서울특별시 종로구 창경궁로26길 38",
      "mapx": "311859",
      "mapy": "553765"
    },
    {
      "title": "<b>은행골</b>대학로점",
      "link": "",
      "category": "일식>초밥,롤",
      "description": "",
      "telephone": "",
      "address": "서울특별시 종로구 명륜4가 146-1",
      "roadAddress": "서울특별시 종로구 창경궁로26길 38",
      "mapx": "311859",
      "mapy": "553765"
    }
  ];

  return (
    <Results>
      {results && results.length > 0 && (
        <List>
          {results.map(result => (
            <li dangerouslySetInnerHTML={{ __html: result.title}}/>
          ))}
        </List>
      )}
    </Results>
    
  )
}

export default SearchResults;

const Results = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`;

const List = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0 20px 20px 20px;
  background-color: var(--ion-item-background, var(--ion-background-color, #fff));

  list-style: none;

  li {
    padding: 8px 0;
    cursor: pointer;
  }

  li + li {
    margin-top: 8px;
  }
`