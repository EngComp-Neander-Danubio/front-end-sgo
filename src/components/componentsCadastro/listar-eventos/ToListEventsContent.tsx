import React from 'react';
import { useEvents } from '../../../context/eventContext/useEvents';
import { TableSolicitacoes } from '../table-solicitacoes';
import { Pagination } from '../pagination/Pagination';
import { Flex } from '@chakra-ui/react';
interface IToListEventsContent {
  isOpen: boolean;
  handleToggle: () => void;
}
export const ToListEventsContent: React.FC<IToListEventsContent> = ({
  isOpen,
}) => {
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
    updateEvent,
  } = useEvents();

  // Defina as colunas desejadas e o mapeamento para as chaves dos eventos
  const columnsMap: { [key: string]: string } = {
    Ord: 'id', // Exemplo: 'Ord' mapeia para 'id'
    'Título da Operação': 'nomeOperacao',
    'Data inicial': 'dataInicio',
    'Data final': 'dataFinal',
    //'Status': 'status',
    'Comandante': 'comandante',
  };

  // Use o mapeamento para criar as colunas a serem exibidas
  const columns = Object.keys(columnsMap);

  // Transforme os registros dos eventos com as novas chaves
  const transformedEvents = events.map(event => {
    const transformedEvent: { [key: string]: any } = {};
    Object.entries(columnsMap).forEach(([newKey, originalKey]) => {
      transformedEvent[newKey] = event[originalKey];
    });
    return transformedEvent;
  });

  return (
    <>
      <Flex
        //mt={2}
        flexDirection={'column'}
        w={'100%'}
      >
        <TableSolicitacoes
          isActions
          isOpen={true}
          isView={true}
          columns={columns}
          registers={transformedEvents}
          label_tooltip="Operação"
          height={'32vh'}
          handleDelete={() => deleteEvent} //handleDelete={deletePMByCGO}
          handleUpdate={updateEvent}
        />
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
