import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';

import { useToast } from '@chakra-ui/react';
import { readString } from 'react-papaparse';
import api from '../../services/api';
import { useEvents } from '../eventContext/useEvents';
import { number } from 'prop-types';
export type Posto = {
  columns?: string[];
  registers?: { [key: string]: any }[];
};
export interface PostoForm {
  local: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  modalidade: string;
  qtd_efetivo: number;
  Cel?: number;
  TenCel?: number;
  Maj?: number;
  Cap?: number;
  PrimeiroTen?: number;
  SegundoTen?: number;
  St?: number;
  PrimeiroSgt?: number;
  SegundoSgt?: number;
  TerceiroSgt?: number;
  Cb?: number;
  Sd?: number;
  AlSd?: number;
  [key: string]: any;
}

export interface IContextPostoData {
  postos: PostoForm[];
  postoById: PostoForm;
  postosByAPI: PostoForm[];
  hasMore: boolean;
  currentPosition: number;
  handleClick: () => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmitP: (e: React.FormEvent) => void;
  loadMore: () => void;
  loadLess: () => void;
  uploadPosto: (data: PostoForm) => Promise<void>;
  uploadPostoEmLote: () => Promise<void>;
  loadPostosByAPI: () => Promise<void>;
  updatePosto: (data: PostoForm, id: string) => Promise<void>;
}

export const PostosContext = createContext<IContextPostoData | undefined>(
  undefined,
);

export const PostosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toast = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [postos, setPostos] = useState<PostoForm[]>([]);
  const [postosByAPI, setPostosByAPI] = useState<PostoForm[]>([]);
  const [posto, setPosto] = useState<PostoForm[]>([]);
  const [postoById, setPostoById] = useState<PostoForm>();
  const [currentPosition, setCurrentPosition] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const rowsPerLoad = 100; // Número de linhas para carregar por vez
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { eventById } = useEvents();
  const handleClick = () => {
    document.getElementById('postoInput')?.click();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);

      const fileReader = new FileReader();

      fileReader.onload = posto => {
        const text = posto.target?.result;
        if (typeof text === 'string') {
          loadCSVChunk(text, 1, rowsPerLoad);
          setCurrentPosition(rowsPerLoad);
        }
      };

      fileReader.readAsText(e.target.files?.[0], 'ISO-8859-1'); // Usando encoding para suportar acentos

      setCurrentPosition(0);
      setHasMore(true);
    }
  };

  const loadCSVChunk = (text: string, start: number, end: number) => {
    const lines = text.split('\n');

    // Garantir que o header seja corretamente identificado
    const headerLine = lines[0];
    const csvRows = lines.slice(start, end);

    if (!headerLine || csvRows.length === 0) {
      setHasMore(false);
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
        setPostos(prevArray => [...prevArray, ...parsedArray]);

        //console.log('Postos', parsedArray);

        // Checar se há mais dados para carregar
        if (parsedArray.length < end - start) {
          setHasMore(false);
        }
      },
    });
    return results;
  };

  const handleOnSubmitP = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = posto => {
        const text = posto.target?.result;
        if (typeof text === 'string') {
          loadCSVChunk(text, 1, rowsPerLoad);
          setCurrentPosition(rowsPerLoad);
        }
      };

      fileReader.readAsText(file, 'ISO-8859-1'); // Usando encoding para suportar acentos
    }
  };

  const loadMore = () => {
    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = posto => {
        const text = posto.target?.result;
        if (typeof text === 'string') {
          loadCSVChunk(
            text,
            currentPosition + 1,
            currentPosition + rowsPerLoad,
          );
          setCurrentPosition(currentPosition + rowsPerLoad);
        }
      };

      fileReader.readAsText(file, 'ISO-8859-1');
    }
  };
  const loadLess = () => {
    if (file && currentPosition > rowsPerLoad) {
      const fileReader = new FileReader();

      fileReader.onload = posto => {
        const text = posto.target?.result;
        if (typeof text === 'string') {
          const newStart = Math.max(0, currentPosition - 2 * rowsPerLoad);
          const newEnd = currentPosition - rowsPerLoad;

          loadCSVChunk(text, newStart, newEnd);

          setCurrentPosition(newStart + rowsPerLoad);
        }
      };

      fileReader.readAsText(file, 'ISO-8859-1');
    }
  };
  const loadPostosByAPI = useCallback(async (id: string) => {
    setIsLoading(true);
    //const parameters = param !== undefined ? param : '';
    try {
      const response = await api.get<{ items: PostoForm[] }>(
        `/operacao/${id}/postos`,
      );
      setPostosByAPI((response.data as unknown) as PostoForm[]);
      console.log(postosByAPI);
      toast({
        title: 'Sucesso',
        description: 'Postos carregados com sucesso',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
      console.log('Dados carregados:', response.data);
    } catch (error) {
      console.error('Falha ao carregar os Postos:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const uploadPosto = useCallback(async (data: PostoForm) => {
    const { rua, bairro, cidade, numero } = data;
    setIsLoading(true);
    const dataPosto = {
      rua,
      numero,
      cidade,
      bairro,
      operacaoId: 202401,
      //operacaoId: (eventById?.id as unknown) as number,
    };

    try {
      await api.post(`/posto`, dataPosto);
      //setPosto((response.data as unknown) as Posto[]);
      toast({
        title: 'Sucesso',
        description: 'Posto salvo com sucesso',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Falha ao salvar posto:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao salvar o posto',
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);
  const uploadPostoEmLote = useCallback(async () => {
    setIsLoading(true);
    //const postos: { [postos] };
    console.log(postos);
    try {
      // Envia o array de postos para a API
      await api.post('/postos/upload', postos);

      // Exibe uma notificação de sucesso
      toast({
        title: 'Sucesso',
        description: 'Postos salvos com sucesso',
        status: 'success',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Falha ao salvar postos:', error);

      // Exibe uma notificação de erro
      toast({
        title: 'Erro',
        description: 'Falha ao salvar os postos',
        status: 'error',
        position: 'top-right',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [postos, api, toast]);

  const updatePosto = useCallback(
    async (data: PostoForm, id: string) => {
      setIsLoading(true);
      try {
        await api.put(`/posto/${id}`, data);
        // await loadTasks();
        toast({
          title: 'Sucesso',
          description: 'Posto atualizada com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
        setPostoById((null as unknown) as PostoForm);
      } catch (error) {
        console.error('Falha ao atualizar a Posto:', error);
        toast({
          title: 'Erro',
          description: 'Falha ao atualizar a Posto',
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

  const deletePosto = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        await api.delete(`/posto/${id}`);
        // await loadTasks();
        toast({
          title: 'Sucesso',
          description: 'Posto deletada com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Falha ao deletar a posto:', error);
        toast({
          title: 'Erro',
          description: 'Falha ao deletar a posto',
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
      postos,
      postosByAPI,
      postoById,
      hasMore,
      currentPosition, // Incluído
      handleClick,
      loadMore,
      loadLess,
      handleOnChange,
      handleOnSubmitP,
      uploadPosto,
      uploadPostoEmLote,
      deletePosto,
      updatePosto,
      loadPostosByAPI,
    }),
    [
      postos,
      postosByAPI,
      postoById,
      hasMore,
      currentPosition, // Incluído
      handleClick,
      loadMore,
      loadLess,
      handleOnChange,
      handleOnSubmitP,
      uploadPosto,
      uploadPostoEmLote,
      deletePosto,
      updatePosto,
      loadPostosByAPI,
    ],
  );

  return (
    <PostosContext.Provider value={contextValue}>
      {children}
    </PostosContext.Provider>
  );
};
