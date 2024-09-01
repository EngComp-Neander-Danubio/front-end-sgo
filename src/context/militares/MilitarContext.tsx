import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import { useToast } from '@chakra-ui/react';
import { readString } from 'react-papaparse';
import { Militares_service } from '../requisitosContext/RequisitosContext';
import api from '../../services/api';

export type Militares = {
  columns?: string[];
  registers?: { [key: string]: any }[];
};
export interface Militar {
  id?: string;
  nome_completo: string;
  opm: string;
  matricula: string;
  posto_grad: string;
}
export interface IContextMilitaresData {
  militares: Militares_service[];
  militarById: Militar;
  hasMoreMilitar: boolean;
  currentPositionMilitar: number;
  handleClickMilitar: () => void;
  handleOnChangeMilitar: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmitMilitar: (e: React.FormEvent) => void;
  loadMoreMilitar: () => void;
  loadLessMilitar: () => void;
  loadMilitarBySAPM: (param?: string) => void;
  loadMilitarById: (id: string) => Promise<void>;
  uploadMilitar: (data: Militares_service) => void;
  uploadMilitaresEmLote: (data: Militares_service[]) => void;
  updateMilitar: (data: Militar, id: string) => Promise<void>;
}

export const MilitaresContext = createContext<
  IContextMilitaresData | undefined
>(undefined);

export const MilitaresProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [militares, setMilitares] = useState<Militares_service[]>([]);
  const [militarById, setMilitarById] = useState<Militar>();
  const [currentPositionMilitar, setCurrentPositionMilitar] = useState(0);
  const [hasMoreMilitar, setHasMoreMilitar] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const rowsPerLoad = 100; // Número de linhas para carregar por vez
  // Use o mapeamento para criar as colunas a serem exibidas

  const handleClickMilitar = () => {
    document.getElementById('militarInput')?.click();
  };

  const handleOnChangeMilitar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      const fileReader = new FileReader();

      fileReader.onload = event => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          loadCSVChunk(text, 1, rowsPerLoad);
          setCurrentPositionMilitar(rowsPerLoad);
        }
      };

      fileReader.readAsText(e.target.files?.[0], 'ISO-8859-1'); // Usando encoding para suportar acentos

      // setMilitares([]);
      setCurrentPositionMilitar(0);
      setHasMoreMilitar(true);
    }
  };

  const loadCSVChunk = (text: string, start: number, end: number) => {
    const lines = text.split('\n');

    // Garantir que o header seja corretamente identificado
    const headerLine = lines[0];
    const csvRows = lines.slice(start, end);

    if (!headerLine || csvRows.length === 0) {
      setHasMoreMilitar(false);
      return;
    }

    // Parse the header to get the column names
    const results = readString([headerLine, ...csvRows].join('\n'), {
      header: true,
      delimiter: ';',
      skipEmptyLines: true,
      complete: result => {
        // Verifique se há problemas com o parsing
        if (result.errors.length > 0) {
          console.error('Erro ao processar CSV:', result.errors);
          return;
        }

        const parsedArray = result.data as any[];

        // Atualizar o estado com os novos dados
        setMilitares(prevArray => [...prevArray, ...parsedArray]);

        //console.log('Militares', parsedArray);

        // Checar se há mais dados para carregar
        if (parsedArray.length < end - start) {
          setHasMoreMilitar(false);
        }
      },
    });
    return results;
  };

  const handleOnSubmitMilitar = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = event => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          loadCSVChunk(text, 1, rowsPerLoad);
          setCurrentPositionMilitar(rowsPerLoad);
        }
      };

      fileReader.readAsText(file, 'ISO-8859-1'); // Usando encoding para suportar acentos
    }
  };

  const loadMoreMilitar = () => {
    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = event => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          loadCSVChunk(
            text,
            currentPositionMilitar + 1,
            currentPositionMilitar + rowsPerLoad,
          );
          setCurrentPositionMilitar(currentPositionMilitar + rowsPerLoad);
        }
      };

      fileReader.readAsText(file, 'ISO-8859-1');
    }
  };
  const loadLessMilitar = () => {
    if (file && currentPositionMilitar > rowsPerLoad) {
      const fileReader = new FileReader();

      fileReader.onload = event => {
        const text = event.target?.result;
        if (typeof text === 'string') {
          const newStart = Math.max(
            0,
            currentPositionMilitar - 2 * rowsPerLoad,
          );
          const newEnd = currentPositionMilitar - rowsPerLoad;

          loadCSVChunk(text, newStart, newEnd);

          setCurrentPositionMilitar(newStart + rowsPerLoad);
        }
      };

      fileReader.readAsText(file, 'ISO-8859-1');
    }
  };
  const loadMilitarById = useCallback(
    async (id: string) => {
      setIsLoading(true);
      setMilitarById(militares.find(e => e.id === id));
    },
    [militares],
  );

  const loadMilitarBySAPM = useCallback(async (param?: string) => {
    setIsLoading(true);
    const parameters = param !== undefined ? param : '';
    try {
      const response = await api.get<{ items: Militares_service[] }>(
        `militares/${parameters}`,
      );
      setMilitares((response.data as unknown) as Militares_service[]);
      toast({
        title: 'Sucesso',
        description: 'Militares carregados com sucesso',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
      console.log('Dados carregados:', response.data);
    } catch (error) {
      console.error('Falha ao carregar os eventos/operações:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const uploadMilitar = useCallback(
    async (data: Militares_service) => {
      setIsLoading(true);
      //console.log('Chamou o post de evento', data);
      try {
        const response = await api.post('/militares', data);
        console.log('resposta: ', response.data);
        toast({
          title: 'Sucesso',
          description: 'Militar salvo com sucesso',
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
  const updateMilitar = useCallback(
    async (data: Militar, id: string) => {
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
        setMilitarById((null as unknown) as Militar);
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
  const uploadMilitaresEmLote = useCallback(
    async (data: Militares_service[]) => {
      setIsLoading(true);
      //console.log('Chamou o post de evento', data);
      try {
        const response = await api.post('/militares', data);
        console.log('resposta: ', response.data);
        toast({
          title: 'Sucesso',
          description: 'Militar salvo em lote com sucesso',
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
  //const headerKeys = Militares.length > 0 ? Object.keys(Militares[0]) : [];

  const contextValue = useMemo(
    () => ({
      militares,
      hasMoreMilitar,
      currentPositionMilitar, // Incluído
      militarById,
      handleClickMilitar,
      loadMoreMilitar,
      loadLessMilitar,
      handleOnChangeMilitar,
      handleOnSubmitMilitar,
      loadMilitarBySAPM,
      uploadMilitar,
      uploadMilitaresEmLote,
      loadMilitarById,
      updateMilitar,
    }),
    [
      militares,
      hasMoreMilitar,
      currentPositionMilitar, // Incluído
      militarById,
      handleClickMilitar,
      loadMoreMilitar,
      loadLessMilitar,
      handleOnChangeMilitar,
      handleOnSubmitMilitar,
      loadMilitarBySAPM,
      uploadMilitar,
      uploadMilitaresEmLote,
      loadMilitarById,
      updateMilitar,
    ],
  );

  return (
    <MilitaresContext.Provider value={contextValue}>
      {children}
    </MilitaresContext.Provider>
  );
};
