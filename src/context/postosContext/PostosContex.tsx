import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import { useToast } from '@chakra-ui/react';
import { readString } from 'react-papaparse';
import api from '../../services/api';
export type Posto = {
  columns?: string[];
  registers?: { [key: string]: any }[];
};
export interface PostoForm {
  local: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  modalidade: string;
  qtd_efetivo?: number;
  [key: string]: any;
}

export interface IContextPostoData {
  postos: PostoForm[];
  postosLocal: PostoForm[];
  postoById: PostoForm;
  postosByAPI: PostoForm[];
  handleClick: () => void;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmitP: (e: React.FormEvent) => void;
  loadMore: () => void;
  loadLess: () => void;
  loadPostoForAccordion: (data: PostoForm) => Promise<void>;
  uploadPosto: (data: PostoForm) => Promise<void>;
  uploadPostoEmLote: () => Promise<void>;
  loadPostosByAPI: () => Promise<void>;
  updatePosto: (data: PostoForm, id: string) => Promise<void>;
  deletePostoByOPM: (id?: string, index?: string) => Promise<void>;
  currentDataIndex: number;
  dataPerPage: number;
  lastDataIndex: number;
  firstDataIndex: number;
  totalData: number;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Verifique as mudanças no estado `pms`
  const [postosLocal, setPostosLocal] = useState<PostoForm[]>([]);
  const [postosDaPlanilha, setPostosDaPlanilha] = useState<PostoForm[]>([]);
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dataPerPage] = useState(5); // Defina o número de registros por página

  const lastDataIndex = (currentDataIndex + 1) * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const totalData = postosLocal.length;
  const currentData = postosLocal.slice(firstDataIndex, lastDataIndex);
  const hasMore = lastDataIndex < postosLocal.length;
  const loadPostoForAccordion = (data: PostoForm) => {
    try {
      const postoExists = postosLocal.some(
        m =>
          data.local === m.local &&
          data.bairro === m.bairro &&
          data.numero === m.numero &&
          data.cidade === m.cidade,
      );

      if (!postoExists) {
        setPostosLocal(prevArray => [...prevArray, data]);
        toast({
          title: 'Sucesso',
          description: 'Posto adicionado com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Atenção',
          description: 'Posto já foi adicionado',
          status: 'warning',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Falha ao inserir Posto',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Função para carregar o CSV completo
  const loadCompleteCSV = (text: string) => {
    readString(text, {
      header: true,
      delimiter: ';',
      skipEmptyLines: true,
      complete: result => {
        if (result.errors.length > 0) {
          console.error('Erro ao processar CSV:', result.errors);
          return;
        }

        const parsedArray = result.data as PostoForm[];

        const newPostos = parsedArray.filter(
          a =>
            !postosLocal.some(
              m =>
                a.local === m.local &&
                a.bairro === m.bairro &&
                a.numero === m.numero &&
                a.rua === m.rua &&
                a.cidade === m.cidade,
            ),
        );

        if (newPostos.length > 0) {
          setPostosDaPlanilha(prevArray => [...prevArray, ...newPostos]);
          setPostosLocal(prevArray => [...prevArray, ...postosDaPlanilha]);
          toast({
            title: 'Sucesso',
            description: 'Posto(s) adicionado(s) com sucesso',
            status: 'success',
            position: 'top-right',
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Erro',
            description: 'Todos os Postos já existem, não serão adicionados:',
            status: 'warning',
            position: 'top-right',
            duration: 5000,
            isClosable: true,
          });
        }
      },
    });
  };
  useEffect(() => {
    //console.log('postos de serviço do perfil de OPM', postos);
    if (postosDaPlanilha.length > 0) {
      setPostosLocal(prevArray => [...prevArray, ...postosDaPlanilha]); // Usar spread operator
    }
  }, [postosDaPlanilha]);

  const loadMore = () => {
    if (hasMore) {
      setCurrentDataIndex(prevIndex => prevIndex + 1);
    } else {
      toast({
        title: 'Fim dos dados',
        description: 'Não há mais postos para carregar.',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const loadLess = () => {
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

  const handleOnSubmitP = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = posto => {
        const text = posto.target?.result;
        if (typeof text === 'string') {
          loadCompleteCSV(text);
          setCurrentDataIndex(dataPerPage);
        }
      };
      fileReader.readAsText(file, 'ISO-8859-1');
    }
  };

  useEffect(() => {}, [postosLocal]);
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
          loadCompleteCSV(text);
          setCurrentDataIndex(0);
        }
      };
      fileReader.readAsText(e.target.files[0], 'ISO-8859-1');
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
  const deletePostoByOPM = useCallback(
    async (id?: string, index?: string) => {
      setIsLoading(true);

      if (id) {
        try {
          console.log('delete com id');
          await api.delete(`/postos-opm/${id}`);
          toast({
            title: 'Sucesso',
            description: 'Posto deletado com sucesso',
            status: 'success',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
        } catch (error) {
          console.error('Falha ao deletar o posto:', error);
          toast({
            title: 'Erro',
            description: 'Falha ao deletar o posto',
            status: 'error',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
        } finally {
          setIsLoading(false);
        }
      } else if (index) {
        //console.log('delete com index');
        const indexDeletedOpm =
          currentDataIndex * (lastDataIndex - firstDataIndex) + Number(index);

        if (indexDeletedOpm < 0 || indexDeletedOpm >= postosLocal.length) {
          toast({
            title: 'Erro!',
            description: 'Posto não encontrado na lista.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
          setIsLoading(false);
          return;
        }
        const updatedOpm = postosLocal.filter((_, i) => i !== indexDeletedOpm);

        setPostosLocal(updatedOpm);
        if (updatedOpm.length !== postosLocal.length) {
          toast({
            title: 'Exclusão de Posto.',
            description: 'Posto excluído com sucesso.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
        }
        setIsLoading(false);
      }
    },
    [postosLocal, currentDataIndex, currentData.length],
  );

  const contextValue = useMemo(
    () => ({
      postosLocal: currentData,
      postos,
      postosByAPI,
      postoById,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
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
      loadPostoForAccordion,
      deletePostoByOPM,
    }),
    [
      postosLocal,
      postos,
      postosByAPI,
      postoById,
      totalData,
      firstDataIndex,
      lastDataIndex,
      currentDataIndex,
      dataPerPage,
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
      loadPostoForAccordion,
      deletePostoByOPM,
    ],
  );

  return (
    <PostosContext.Provider value={contextValue}>
      {children}
    </PostosContext.Provider>
  );
};
