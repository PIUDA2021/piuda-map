import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { IonHeader, IonToolbar, IonInput, IonButton, IonList, IonItem} from '@ionic/react';
import API from '../api';
import { HomeContext } from '../pages/HomePage';


const InputForm = () => {
  const { departureInput, arrivalInput, setDepartureInput, setArrivalInput, setDeparture, setArrival }  = useContext(HomeContext);

  return (
    <IonHeader>
      <IonToolbar>
        <Form>
          <IonList>
            <IonItem>
              <IonInput 
                value={departureInput} 
                placeholder="Enter Departure" 
                onIonChange={e => setDepartureInput(e.detail.value)}
              />  
            </IonItem>
            <IonItem>
              <IonInput 
                value={arrivalInput} 
                placeholder="Enter Arrival" 
                onIonChange={e => setArrivalInput(e.detail.value)}
              />
            </IonItem>
          </IonList>
          <IonButton>
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
