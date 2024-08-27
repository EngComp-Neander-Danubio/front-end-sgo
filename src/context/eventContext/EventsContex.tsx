import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';

import { useToast } from '@chakra-ui/react';
import api from '../../services/api';
/* export type Events = {
  columns?: string[];
  registers?: { [key: string]: any }[];
}; */

interface Event {
  nomeOperacao: string;
  comandante: string;
  dataInicio: Date;
  dataFinal: Date;
}

export interface IContextEventsData {
  events: Event[];

  //handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadEvent: (data: Event) => Promise<void>;
  loadEvents: (param?: string) => Promise<void>;
  updateEvents: (data: Event, id: string) => Promise<void>;
  //handleOnSubmitP: (e: React.FormEvent) => void;
}

export const EventsContext = createContext<IContextEventsData | undefined>(
  undefined,
);

export const EventsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [eventById, setEventById] = useState<Event>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadEvent = useCallback(
    async (data: Event) => {
      setIsLoading(true);
      console.log('Chamou o post de evento', data);
      try {
        const response = await api.post('/operacao', data);
        console.log('resposta: ', response.data);
        toast({
          title: 'Sucesso',
          description: 'Evento/Operação atualizada com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        console.error('error:', error);
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const loadEvents = useCallback(async (param?: string) => {
    setIsLoading(true);
    const parameters = param !== undefined ? param : '';
    try {
      const response = await api.get<{ items: Event[] }>(
        `operacao/${parameters}`,
      );
      setEvents((response.data as unknown) as Event[]);
       /* toast({
         title: 'Sucesso',
         description: 'Eventos/Operações carregados com sucesso',
         status: 'success',
         position: 'top-right',
         duration: 9000,
         isClosable: true,
       }); */
      console.log('Dados carregados:', response.data);
    } catch (error) {
      console.error('Falha ao carregar os eventos/operações:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const updateEvents = useCallback(
    async (data: Event, id: string) => {
      setIsLoading(true);
      try {
        await api.put(`/tasks/${id}`, data);
        // await loadTasks();
        toast({
          title: 'Sucesso',
          description: 'Tarefa atualizada com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
        setEventById((null as unknown) as Event);
      } catch (error) {
        console.error('Falha ao atualizar a tarefa:', error);
        toast({
          title: 'Erro',
          description: 'Falha ao atualizar a tarefa',
          status: 'error',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const contextValue = useMemo(
    () => ({
      uploadEvent,
      loadEvents,
      updateEvents,
      events,
      eventById,
    }),
    [uploadEvent, loadEvents, updateEvents, events, eventById],
  );

  return (
    <EventsContext.Provider value={contextValue}>
      {children}
    </EventsContext.Provider>
  );
};
