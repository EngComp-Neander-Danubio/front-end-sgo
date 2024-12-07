import { TableSolicitacoes } from '../table-solicitacoes';
import { Flex, FlexProps, useDisclosure } from '@chakra-ui/react';
import { Pagination } from '../pagination/Pagination';
import { useSolicitacoesPostos } from '../../../context/solicitacoesPostosContext/useSolicitacoesPostos';
import { ModalSolicitacarPostosRed } from '../modal/redistribuicao-postos/ModalSolicitarPostosRed';
import React from 'react';
import TableGeneric, { ColumnProps } from '../table-generic/TableGeneric';
import { IconeDeletar } from '../../componentesFicha/registrosMedicos/icones/iconeDeletar';
import { IconeRedistribuir } from '../../componentesFicha/registrosMedicos/icones/iconeRedistribuir';
import { IconeBusca } from '../../componentesGerais/iconesMenuLateral/iconeMenulateralBusca';
import { IconeVisualizar } from '../../componentesFicha/registrosMedicos/icones/iconeVisualizarSolicitacao';
import { useNavigate } from 'react-router-dom';

type Data = {
  isOpen?: boolean;
  id?: string;
  sps_id: number;
  sps_operacao_id: string;
  solicitacao: string;
  sps_status: string;
  prazo_final: Date;
  prazo_inicial: Date;
  unidades_id: number;
  nome_operacao: string;
};
// lista as solicitacoes da OPM no que se refere ao posto de serviço
export const ToListSolicitacoesPostosContent: React.FC = () => {
  const {
    solicitacoesPostos,
    totalData,
    firstDataIndex,
    lastDataIndex,
    dataPerPage,
    loadLessSolicitacoesPostos,
    loadMoreSolicitacoesPostos,
    loadSolicitacaoPostosById,
  } = useSolicitacoesPostos();
  const navigate = useNavigate();
  
  const {
    isOpen: isOpenFormRedSolPosto,
    onOpen: onOpenFormRedSolPosto,
    onClose: onCloseFormRedSolPosto,
  } = useDisclosure();
  const columns: Array<ColumnProps<Data>> = [
    /* {
      key: 'id',
      title: 'Id',
    }, */
    {
      key: 'sps_id',
      title: 'Id Solicitação',
    },
    /* {
      key: 'sps_operacao_id',
      title: 'Id Operação',
    }, */
    {
      key: 'nome_operacao',
      title: 'Operação',
    },
    {
      key: 'sps_status',
      title: 'Status',
    },
    {
      key: 'prazo_inicial',
      title: 'Prazo Inicial',
    },
    {
      key: 'prazo_final',
      title: 'Prazo Final',
    },

    {
      key: 'acoes',
      title: 'Ações',
      render: (_, record) => {
        return (
          <Flex flexDirection={'row'} gap={2}>
            <IconeVisualizar
              key={`${record.id}`}
              label_tooltip={`${record.sps_id}`}
              onOpen={async () => {
                const idSolicitacao = Number(record.id);
                await loadSolicitacaoPostosById(idSolicitacao);
                navigate(`/solicitacao-pms-id/${idSolicitacao}`);
              }}
            />
            <IconeRedistribuir
              key={`${record.id}`}
              label_tooltip={`${record.sps_id}`}
              onOpen={async () => {
                const idSolicitacao = Number(record.id);
                await loadSolicitacaoPostosById(idSolicitacao);
                onOpenFormRedSolPosto;
              }}
            />
          </Flex>
        );
      },
    },
  ];
  return (
    <>
      <Flex flexDirection={'column'} w={'100%'}>
        <TableGeneric data={solicitacoesPostos} columns={columns} />
        {/* Componente de paginação */}
        <Pagination
          totalPages={totalData}
          dataPerPage={dataPerPage}
          firstDataIndex={firstDataIndex}
          lastDataIndex={lastDataIndex}
          loadLess={loadLessSolicitacoesPostos}
          loadMore={loadMoreSolicitacoesPostos}
        />
        {/* <Flex
          flexDirection={'column'}
          //p={8}
          transitionDuration="1.0s"
          w={isOpen ? '86vw' : '94vw'}
        ></Flex> */}
      </Flex>
      <ModalSolicitacarPostosRed
        isOpen={isOpenFormRedSolPosto}
        onOpen={onOpenFormRedSolPosto}
        onClose={onCloseFormRedSolPosto}
      />
    </>
  );
};
