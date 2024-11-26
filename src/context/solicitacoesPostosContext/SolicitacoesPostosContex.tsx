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

export type SolicitacoesPosto = {
  columns?: string[];
  registers?: { [key: string]: any }[];
};

export interface SolicitacoesPostoData {
  id: number;
  operacao_id: string;
  solicitacao: string;
  status: string;
  prazo_final: Date;
  prazo_inicio: Date;
  //bairro: string;
  //qtd_postos: string | number;
  [key: string]: any;
}

export interface IContextSolicitacoesPostoData {
  solicitacoesPostos: SolicitacoesPostoData[];
  loadSolicitacaoPostosByApi: (param: number) => Promise<void>;
  loadMoreSolicitacoesPostos: () => void;
  loadLessSolicitacoesPostos: () => void;
  currentDataIndex: number;
  dataPerPage: number;
  lastDataIndex: number;
  firstDataIndex: number;
  totalData: number;
}

export const SolicitacoesPostosContext = createContext<
  IContextSolicitacoesPostoData | undefined
>(undefined);

export const SolicitacoesPostosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const [solicitacoesPostos, setSolicitacoesPostos] = useState<
    SolicitacoesPostoData[]
  >([]);
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dataPerPage] = useState(15); // Defina o número de registros por página
  const lastDataIndex = (currentDataIndex + 1) * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const totalData = solicitacoesPostos.length;

  const currentData = solicitacoesPostos.slice(firstDataIndex, lastDataIndex);
  useEffect(() => {
    loadSolicitacaoPostosByApi(1904);
  }, []);
  const loadSolicitacaoPostosByApi = useCallback(async (param: number) => {
    try {
      const response = await api.get<SolicitacoesPostoData[]>(
        `solicitacao-postos/${param}`,
      );
      setSolicitacoesPostos(response.data);
    } catch (error) {
      console.error('Falha ao carregar as Operações:', error);
    }
  }, []);
  const loadMoreSolicitacoesPostos = () => {
    if (lastDataIndex < solicitacoesPostos.length) {
      setCurrentDataIndex(prevIndex => prevIndex + 1);
    } else {
      toast({
        title: 'Fim dos dados',
        description: 'Não há mais solicitações para carregar.',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const loadLessSolicitacoesPostos = () => {
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

  const contextValue = useMemo(
    () => ({
      solicitacoesPostos: currentData,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
      loadMoreSolicitacoesPostos,
      loadLessSolicitacoesPostos,
      loadSolicitacaoPostosByApi,
    }),
    [
      currentData,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
      loadMoreSolicitacoesPostos,
      loadLessSolicitacoesPostos,
      loadSolicitacaoPostosByApi,
    ],
  );

  return (
    <SolicitacoesPostosContext.Provider value={contextValue}>
      {children}
    </SolicitacoesPostosContext.Provider>
  );
};
