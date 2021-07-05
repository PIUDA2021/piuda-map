import styled from '@emotion/styled';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { useHistory } from 'react-router';

const MapPage = () => {
  const history = useHistory();
  const handleMoveHome = () => {
    history.push('/home');
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Content>
          <IonButton onClick={handleMoveHome}>Map 으로</IonButton>
        </Content>
      </IonContent>
    </IonPage>
  );
};

export default MapPage;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;