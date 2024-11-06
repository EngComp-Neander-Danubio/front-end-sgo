import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import { useToast } from '@chakra-ui/react';
import api from '../../services/api';

export interface Event {
  id?: string;
  nomeOperacao: string;
  comandante: string;
  dataInicio: Date;
  dataFinal: Date;
}

export interface IContextEventsData {
  events: Event[];
  eventById: Event;
  uploadEvent: (data: Event) => Promise<void>;
  loadEvents: (param?: string) => Promise<void>;
  loadEventsById: (id: string) => Promise<void>;
  updateEvent: (data: Event, id: string) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  loadMoreEvents: () => void;
  loadLessEvents: () => void;
  currentDataIndex: number;
  dataPerPage: number;
  lastDataIndex: number;
  firstDataIndex: number;
  totalData: number;
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
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dataPerPage] = useState(8);
  const lastDataIndex = (currentDataIndex + 1) * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const totalData = events.length;
  const currentData = events.slice(firstDataIndex, lastDataIndex);
  const hasMore = lastDataIndex < events.length;

  useEffect(() => {
    loadEvents();
  }, []);

  const loadMoreEvents = () => {
    if (hasMore) {
      setCurrentDataIndex(prevIndex => prevIndex + 1);
    } else {
      toast({
        title: 'Fim dos dados',
        description: 'Não há mais Operações para carregar.',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const loadLessEvents = () => {
    if (firstDataIndex > 0) {
      setCurrentDataIndex(prevIndex => prevIndex - 1);
    } else {
      toast({
        title: 'Início dos dados',
        description: 'Você está na primeira página.',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const uploadEvent = useCallback(
    async (data: Event) => {
      setIsLoading(true);

      try {
        await api.post('/operacao', data);
        toast({
          title: 'Sucesso',
          description: 'Evento/Operação atualizada com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        //console.error('error:', error);
        toast({
          title: 'Erro',
          description: 'Falha ao Criar Operação',
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
  const loadEvents = useCallback(async (param?: string) => {
    setIsLoading(true);
    const parameters = param !== undefined ? param : '';
    try {
      const response = await api.get<{ items: Event[] }>(
        `operacoes/${parameters}`,
      );
      //setEvents((response.data as unknown) as Event[]);
      setEvents(prevArray => [
        ...prevArray,
        ...((response.data as unknown) as Event[]),
      ]);
    } catch (error) {
      console.error('Falha ao carregar os Operações:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadEventsById = useCallback(
    async (id: string) => {
      setIsLoading(true);
      setEventById(events.find(e => e.id === id));
    },
    [events],
  );
  const updateEvent = useCallback(
    async (data: Event, id: string) => {
      setIsLoading(true);
      try {
        await api.put(`/operacao/${id}`, data);
        // await loadTasks();
        toast({
          title: 'Sucesso',
          description: 'Operação atualizada com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
        setEventById((null as unknown) as Event);
      } catch (error) {
        toast({
          title: 'Erro',
          description: `${error}, 'Falha ao atualizar Operação`,
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
  const deleteEvent = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        await api.delete(`/operacao/${id}`);
        toast({
          title: 'Sucesso',
          description: 'Evento/Operação deletada com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Falha ao deletar a evento/operação:', error);
        toast({
          title: 'Erro',
          description: 'Falha ao deletar a evento/operação',
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
      updateEvent,
      deleteEvent,
      loadEventsById,
      loadLessEvents,
      loadMoreEvents,
      events: currentData,
      eventById,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
    }),
    [
      uploadEvent,
      loadEvents,
      updateEvent,
      deleteEvent,
      loadEventsById,
      loadLessEvents,
      loadMoreEvents,
      events,
      eventById,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
    ],
  );

  return (
    <EventsContext.Provider value={contextValue}>
      {children}
    </EventsContext.Provider>
  );
};
