import React, { useContext, useState, useMemo, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { IonHeader, IonToolbar, IonInput, IonButton, IonList, IonItem} from '@ionic/react';
import { debounce } from 'debounce';
import { HomeContext } from '../pages/HomePage';
import API from '../api';
import { fromTM128ToLatLngString } from '../utils';


const InputForm = () => {
  const departureFocus = useRef(false)
  const arrivalFocus = useRef(false)
  const [_departure, _setDeparture] = useState('ae');
  const [_arrival, _setArrival] = useState("");

  const { 
    setDepartureInput, 
    setArrivalInput, 
    departure, 
    arrival, 
    setRoutes,
  } = useContext(HomeContext);

  const handleSetDepartureDebounced = useMemo(() => debounce(setDepartureInput, 500), [setDepartureInput]);
  const handleSetArrivalDebounced = useMemo(() => debounce(setArrivalInput, 500), [setArrivalInput]);
  const handleSubmit = useMemo(() => {
    if (!departure || !arrival) {
      return;
    }
    const fetchRoute = async () => {
      const { data } = await API.directions5(fromTM128ToLatLngString(departure), fromTM128ToLatLngString(arrival));

      if (data.code === 0) {
        setRoutes({
          tracomfort: data.route.tracomfort[0],
          trafast: data.route.trafast[0],
          traoptimal: data.route.traoptimal[0],
        })
      }
    }
    fetchRoute();
  }, [departure, arrival, setRoutes]);
  
  useEffect(() => {
    if (departure) {
      _setDeparture(departure.title);
    }
  }, [ departure ]);

  useEffect(() => {
    if (arrival) {
      _setArrival(arrival.title);
    }
  }, [ arrival ])

  console.log('_departure', _departure);

  return (
    <IonHeader>
      <IonToolbar>
        <Form>
          <IonList>
            <IonItem>
              <IonInput 
                value={_departure} 
                placeholder="Enter Departure" 
                onIonChange={e => {
                  _setDeparture(e.detail.value);
                  if (departureFocus.current) {
                    handleSetDepartureDebounced(e.detail.value);
                  }
                }}
                onFocus={() => departureFocus.current = true}
                onBlur={() => {
                  departureFocus.current = false;
                  handleSetDepartureDebounced("");
                }}
              />  
            </IonItem>
            <IonItem>
              <IonInput 
                value={_arrival} 
                placeholder="Enter Arrival" 
                onIonChange={e => {
                  _setArrival(e.detail.value);
                  if (arrivalFocus) {
                    handleSetArrivalDebounced(e.detail.value);
                  }
                }}
                onFocus={() => arrivalFocus.current = true}
                onBlur={() => {
                  arrivalFocus.current = false;
                  handleSetArrivalDebounced("");
                }}
              />
            </IonItem>
          </IonList>
          <IonButton onClick={handleSubmit}>
            <span className="button--text">길찾기</span>
          </IonButton>
        </Form>
      </IonToolbar>
    </IonHeader>
  )
}

export default InputForm;

const Form = styled.form`
  display: flex;

  .list-md {
    flex: 1;
    padding: 16px 0 16px 16px;
  }

  .button {
    height: auto;
    margin: 16px;
  }
  .button--text {
    color: white !important;
  }
`;
