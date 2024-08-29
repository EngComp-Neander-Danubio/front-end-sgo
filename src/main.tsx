import App from './App.tsx';
import * as React from 'react';
import { CSSReset, ChakraProvider } from '@chakra-ui/react';
import * as ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthProvider/index.tsx';
import { PostosProvider } from './context/postosContext/PostosContex.tsx';
import { MilitaresProvider } from './context/militares/MilitarContext.tsx';
import { RequisitosProvider } from './context/requisitosContext/RequisitosContext.tsx';
import { EventsProvider } from './context/eventContext/EventsContex.tsx';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../sw.ts')
    .then(registration => {
      console.log('Service Worker registrado com sucesso:', registration);
    })
    .catch(error => {
      console.error('Falha ao registrar o Service Worker:', error);
    });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <MilitaresProvider>
          <EventsProvider>
            <PostosProvider>
              <RequisitosProvider>
                <CSSReset />
                <App />
              </RequisitosProvider>
            </PostosProvider>
          </EventsProvider>
        </MilitaresProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
