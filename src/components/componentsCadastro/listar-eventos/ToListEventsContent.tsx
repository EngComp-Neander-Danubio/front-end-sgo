import React from 'react';
import { useEvents } from '../../../context/eventContext/useEvents';
import { Pagination } from '../pagination/Pagination';
import { Flex } from '@chakra-ui/react';
import TableGeneric, { ColumnProps } from '../table-generic/TableGeneric';
import { IconeDeletar, IconeEditar } from '../../ViewLogin';
import { useNavigate } from 'react-router-dom';
type Data = {
  id: string;
  nomeOperacao: string;
  comandante: number;
  dataInicio: Date;
  dataFinal: Date;
};

export const ToListEventsContent: React.FC = () => {
  const {
    loadEventsById,
    deleteEvent,
    events,
    eventById,
    loadLessEvents,
    loadMoreEvents,
    totalData,
    firstDataIndex,
    lastDataIndex,
    dataPerPage,
  } = useEvents();
  const navigate = useNavigate();
  const columns: Array<ColumnProps<Data>> = [
    /* {
      key: 'id',
      title: 'Id',
    }, */
    {
      key: 'nomeOperacao',
      title: 'Operação',
    },
    {
      key: 'comandante',
      title: 'Comandante',
    },

    {
      key: 'dataInicio',
      title: 'Data Inicial',
    },
    {
      key: 'dataFinal',
      title: 'Data Inicial',
    },
    {
      key: 'acoes',
      title: 'Ações',
      render: (_, record) => {
        return (
          <Flex flexDirection={'row'} gap={2}>
            <IconeEditar
              key={`${record.id}`}
              label_tooltip={`${record.nomeOperacao}`}
              onOpen={async () => {
                const idSolicitacao = record.id;
                await loadEventsById(idSolicitacao);
                navigate(`/editar-operacao/${idSolicitacao}`);
              }}
            />
            <IconeDeletar
              key={`${record.id}`}
              label_tooltip={`${record.nomeOperacao}`}
              handleDelete={async () => {
                const idSolicitacao = record.id;
                await deleteEvent(idSolicitacao);
              }}
            />
          </Flex>
        );
      },
    },
  ];
  return (
    <>
      <Flex
        //mt={2}
        flexDirection={'column'}
        w={'100%'}
      >
        <TableGeneric data={events} columns={columns} />
        <Pagination
          totalPages={totalData}
          dataPerPage={dataPerPage}
          firstDataIndex={firstDataIndex}
          lastDataIndex={lastDataIndex}
          loadLess={loadLessEvents}
          loadMore={loadMoreEvents}
        />
      </Flex>
    </>
  );
};
