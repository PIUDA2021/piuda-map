import React from 'react';
import styled from '@emotion/styled';
import { IonContent, IonPage } from '@ionic/react';
import Map from '../components/Map';
import InputForm from '../components/InputForm';
import SearchResults from '../components/SearchResults'

export const HomeContext = React.createContext({
  departure: null,
  setDeparture: () => console.log("not initialized"),
  arrival: null,
  setArrival: () => console.log("not initialized"),
  departureInput: "",
  setDepartureInput: () => console.log("not initialized"),
  arrivalInput: "",
  setArrivalInput: () => console.log("not initialized"),
  routes: null,
  setRoutes: () => console.log("not initialized"),
});

const HomePage = () => {
  const [ departure, setDeparture ] = React.useState(null);
  const [ arrival, setArrival ] = React.useState(null);
  const [ departureInput, setDepartureInput ] = React.useState("");
  const [ arrivalInput, setArrivalInput ] = React.useState("");
  const [ routes, setRoutes ] = React.useState(null);

  const value = {
    departure,
    setDeparture,
    arrival,
    setArrival,
    departureInput,
    setDepartureInput,
    arrivalInput,
    setArrivalInput,
    routes,
    setRoutes,
  }

  return (
    <IonPage>
      <HomeContext.Provider value={value}>
        <InputForm />
        <IonContent fullscreen>
          <ContentWrapper>
            <Map departure="서울특별시"/>
            <SearchResults />
          </ContentWrapper>
        </IonContent>
      </HomeContext.Provider>
    </IonPage>
  );
};

export default HomePage;

const ContentWrapper = styled.div`
  position: relative;
  height: 100%;
`;