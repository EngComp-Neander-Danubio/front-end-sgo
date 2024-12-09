import React, { useState } from 'react';
import { DashHeader } from '../../../components/layout/dashHeader';
import { MenuLateral } from '../../../components/layout/menulateral';
import {
  Alert,
  Flex,
  Grid,
  GridItem,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useIsOpen } from '../../../context/isOpenContext/useIsOpen';
import TableMain, {
  ColumnProps,
} from '../../../components/componentsCadastro/TableMain/TableMain';
import { IconeEditar } from '../../../components/componentesFicha/registrosMedicos/icones/iconeEditar';
import { IconeDeletar } from '../../../components/componentesFicha/registrosMedicos/icones/iconeDeletar';
import { Pagination } from '../../../components/componentsCadastro/pagination/Pagination';
import { useEvents } from '../../../context/eventContext/useEvents';
import { IconeRedistribuir } from '../../../components/componentesFicha/registrosMedicos/icones/iconeRedistribuir';
import { ModalFormAddEvent } from '../../../components/componentsCadastro/modal/ModalFormAddEvent';
import { ModalFormAddMilitar } from '../../../components/componentsCadastro/formEfetivo/ModalFormAddMilitar';
import { useSolicitacoesPMs } from '../../../context/solicitacoesPMsContext/useSolicitacoesPMs';
import { Militar } from '../../../context/solicitacoesOPMPMsContext/SolicitacoesOPMPMsContext';

type Data = {
  matricula: string;
  ofic_prac: string;
  posto_grad: string;
  nome_completo: string;
  opm: string;
};

const data: Data[] = [
  {
    matricula: '13583919',
    ofic_prac: 'PRACA',
    posto_grad: '1º Sgt PM',
    nome_completo: 'NEULIMAR DE ASSIS SILVA',
    opm: '2ª COMPANHIA DO 1ºBPRAIO',
  },
  {
    matricula: '84395692',
    ofic_prac: 'OFICIAL',
    posto_grad: '1º Ten PM',
    nome_completo: 'WELTESON OLIVEIRA VIANA DA SILVA',
    opm: 'BATALHÃO DE POLÍCIA DO MEIO AMBIENTE',
  },
  {
    matricula: '30864387',
    ofic_prac: 'PRACA',
    posto_grad: 'Sd PM',
    nome_completo: 'ALISON FERREIRA OLIVEIRA',
    opm: '1ª COMPANHIA DO BPMA',
  },
  // ... (adicione os demais registros aqui seguindo o mesmo formato)
];

export const HomePrincipal: React.FC = () => {
  const toast = useToast();
  const [pms, setPMs] = useState<Militar[]>([]);
  const [currentDataIndex, setCurrentDataIndex] = useState(0);
  const [dataPerPage] = useState(1); // Defina o número de registros por página
  const lastDataIndex = (currentDataIndex + 1) * dataPerPage;
  const firstDataIndex = lastDataIndex - dataPerPage;
  const totalData = data.length;
  const currentData = data.slice(firstDataIndex, lastDataIndex);
  const hasMore = lastDataIndex < data.length;
  // Função para carregar mais PMs (próxima página)
  const loadMoreSolicitacoesOPMPMs = () => {
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

  // Função para carregar menos PMs (página anterior)
  const loadLessSolicitacoesOPMPMs = () => {
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
  const loadPMByOPM = (data: Militar) => {
    try {
      const pmExists = pms.some(m => m.matricula === data.matricula);

      if (!pmExists) {
        setPMs(prevArray => [...prevArray, data]);
        toast({
          title: 'Sucesso',
          description: 'PM adicionado com sucesso',
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Atenção',
          description: 'PM já foi adicionado',
          status: 'warning',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: 'Erro',
        description: 'Falha ao inserir PM',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const columns: Array<ColumnProps<Data>> = [
    {
      key: 'matricula',
      title: 'Matrícula',
    },
    
    {
      key: 'posto_grad',
      title: 'Posto/Graduação',
    },
    {
      key: 'nome_completo',
      title: 'Nome Completo',
    },
    {
      key: 'opm',
      title: 'OPM',
    },
    {
      key: 'acoes',
      title: 'Ações',
      render: (_, record) => {
        return (
          <Flex flexDirection={'row'} gap={2}>
            <span>
              <IconeDeletar
                //key={`${record.matricula}`}
                label_tooltip={`${record.nome_completo}`}
                onClick={() => console.log(`Aprovando ${record.matricula}`)}
              />
            </span>
            <IconeEditar
              //key={`${record.matricula}`}
              label_tooltip={`${record.nome_completo}`}
            />
            <IconeRedistribuir
              //key={`${record.matricula}`}
              label_tooltip={`${record.nome_completo}`}
              onOpen={onOpenFormAddMilitar}
            />
          </Flex>
        );
      },
    },
  ];

  const {
    isOpen: isOpenFormAddMilitar,
    onOpen: onOpenFormAddMilitar,
    onClose: onCloseFormAddMilitar,
  } = useDisclosure();
  return (
    <>
      <Flex
        bg="rgba(248, 249, 250, 1)"
        w={'100%'}
        //h={'100vh'}
        maxH={'100vh'}
        overflow="hidden"
        // border={'1px solid red'}
      >
        <Grid
          templateAreas={`"nav header"
                                    "nav main"
                                    "nav main"`}
          gap={{
            lg: 2,
            md: 2,
            sm: 2,
          }}
          mt={{
            lg: 2,
            md: 2,
            sm: 2,
          }}
          mb={{
            lg: 2,
            md: 2,
            sm: 2,
          }}
          ml={{
            lg: 2,
            md: 2,
            sm: 0,
          }}
          mr={{
            lg: 2,
            md: 2,
            sm: 0,
          }}
          gridTemplateRows={'80px 1fr'}
          //maxH={'100vh'}
        >
          <GridItem area={'header'}>
            <DashHeader />
          </GridItem>
          <GridItem area={'nav'}>
            <MenuLateral />
          </GridItem>
          <GridItem area={'main'}>
            <>
              <div>
                <TableMain data={currentData} columns={columns} />
                <Pagination
                  totalPages={totalData}
                  dataPerPage={dataPerPage}
                  firstDataIndex={firstDataIndex}
                  lastDataIndex={lastDataIndex}
                  loadLess={loadLessSolicitacoesOPMPMs}
                  loadMore={loadMoreSolicitacoesOPMPMs}
                />
              </div>
            </>
          </GridItem>
        </Grid>
      </Flex>
      <ModalFormAddMilitar
        isOpen={isOpenFormAddMilitar}
        onOpen={onOpenFormAddMilitar}
        onClose={onCloseFormAddMilitar}
        uploadPM={loadPMByOPM}
      />
    </>
  );
};
