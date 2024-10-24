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
import { OptionType } from '../../types/typesMilitar';

export interface Event {
  id?: string;
  nomeOperacao: string;
  comandante: string;
  dataInicio: Date;
  dataFinal: Date;
}
interface opmSaPM {
  uni_codigo_pai: number;
  uni_codigo: number;
  uni_sigla: string;
  uni_nome: string;
}
export interface IContextEventsData {
  events: Event[];
  eventById: Event;
  datasOPMSapm: opmSaPM[];
  datasOPMSapmChildren: opmSaPM[];
  uploadEvent: (data: Event) => Promise<void>;
  loadEvents: (param?: string) => Promise<void>;
  loadEventsById: (id: string) => Promise<void>;
  updateEvent: (data: Event, id: string) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  loadMoreEvents: () => void;
  loadLessEvents: () => void;
  loadIdsFromOPMsMain: () => Promise<void>;
  loadIdsFromOPMsChildren: (param: number) => Promise<opmSaPM[]>;
  handleDeleteOpmModal: (param: opmSaPM) => Promise<void>;
  handleDeleteOpmFromSameFather: (param: opmSaPM) => Promise<void>;
  handleDeleteSelectAllOpm: () => Promise<void>;
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
  const [datasOPMSapm, setDatasOPMSapm] = useState<opmSaPM[]>([]);
  const [datasOPMSapmChildren, setDatasOPMSapmChildren] = useState<opmSaPM[]>(
    [],
  );
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
  useEffect(() => {
    loadIdsFromOPMsMain();
  }, []);
  const loadMoreEvents = () => {
    if (hasMore) {
      setCurrentDataIndex(prevIndex => prevIndex + 1);
    } else {
      toast({
        title: 'Fim dos dados',
        description: 'Não há mais PPMM para carregar.',
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

  const loadIdsFromOPMsMain = useCallback(async () => {
    try {
      const response = await api.get<opmSaPM[]>('/unidades');
      setDatasOPMSapm(response.data);
      console.log('Dados recebidos da API:', response.data);
    } catch (error) {
    } finally {
    }
  }, []);

  const loadIdsFromOPMsChildren = useCallback(async (param: number) => {
    try {
      const response = await api.get<opmSaPM[]>(`/listar-opms/${param}`);
      const dados = response.data.map(opm => ({
        ...opm,
        uni_codigo_pai: param,
      }));
      setDatasOPMSapmChildren(prev => [...prev, ...dados]);
    } catch (error) {
      console.error('Erro ao carregar as unidades:', error);
    } finally {
    }
  }, []);

  const handleDeleteOpmModal = useCallback(async (param: opmSaPM) => {
    setDatasOPMSapmChildren(dataOpmChildren => {
      return dataOpmChildren.filter(o => {
        return !o.uni_sigla.includes(param.uni_sigla);
      });
    });
  }, []);
  const handleDeleteOpmFromSameFather = useCallback(
    async (param: opmSaPM) => {
      setDatasOPMSapmChildren(() => {
        return datasOPMSapmChildren.filter(
          o => o.uni_codigo_pai !== param.uni_codigo,
        );
      });
    },
    [datasOPMSapmChildren],
  );

  const handleDeleteSelectAllOpm = useCallback(async () => {
    setDatasOPMSapmChildren([]);
  }, []);
  const uploadEvent = useCallback(
    async (data: Event) => {
      setIsLoading(true);

      try {
        const response = await api.post('/operacao', data);
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
        `operacao/${parameters}`,
      );
      //setEvents((response.data as unknown) as Event[]);
      setEvents(prevArray => [
        ...prevArray,
        ...((response.data as unknown) as Event[]),
      ]);
    } catch (error) {
      console.error('Falha ao carregar os eventos/operações:', error);
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
  useEffect(() => {}, [
    handleDeleteOpmFromSameFather,
    datasOPMSapm,
    datasOPMSapmChildren,
  ]);
  const contextValue = useMemo(
    () => ({
      uploadEvent,
      loadEvents,
      updateEvent,
      deleteEvent,
      loadEventsById,
      loadLessEvents,
      loadMoreEvents,
      loadIdsFromOPMsMain,
      loadIdsFromOPMsChildren,
      handleDeleteOpmModal,
      handleDeleteSelectAllOpm,
      handleDeleteOpmFromSameFather,
      datasOPMSapm,
      datasOPMSapmChildren,
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
      loadIdsFromOPMsMain,
      loadIdsFromOPMsChildren,
      handleDeleteOpmModal,
      handleDeleteSelectAllOpm,
      handleDeleteOpmFromSameFather,
      datasOPMSapm,
      datasOPMSapmChildren,
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
