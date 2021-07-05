import React, { useState, useContext, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import {  } from '@ionic/react';
import API from '../api';
import { HomeContext } from '../pages/HomePage';

const SearchResults = () => {  
  const [results, setResults] = useState([]);
  const resultsFor = useRef(null);
  const listRef = useRef(null)
  const { 
    arrival,
    departure,
    departureInput,
    arrivalInput,
    setDepartureInput,
    setArrivalInput,
    setDeparture,
    setArrival
  } = useContext(HomeContext);

  const handleClick = (value) => {
    if (!listRef.current) {
      return;
    }
    if (resultsFor.current === "departure") {
      setDeparture(value)
      setDepartureInput("");
    }
    if (resultsFor.current === "arrival") {
      setArrival(value)
      setArrivalInput("");
    }
    resultsFor.current = null;
    setResults([]);
  }

  useEffect(() => {
    const search = async (searchText) => {
      const { data: { items } } = await API.search(searchText);
      setResults(items);
    }
    resultsFor.current = null;

    if (departureInput && departureInput !== departure?.title) {
      resultsFor.current = "departure";
      return search(departureInput);
    }

    if (arrivalInput && arrivalInput !== arrival?.title) {
      resultsFor.current = "arrival";
      return search(arrivalInput);
    }
  }, [departureInput, arrivalInput, arrival, departure]);

  return (
    <Results>
      {results.length > 0 && (
        <List ref={listRef}>
          {results.map((result) => (
            <li 
              key={`${result.mapx}${result.mapy}`} 
              dangerouslySetInnerHTML={{ __html: result.title}}
              onClick={(e) => handleClick({ ...result, title: e.target.textContent })}
            />
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
  padding: 16px 24px;
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