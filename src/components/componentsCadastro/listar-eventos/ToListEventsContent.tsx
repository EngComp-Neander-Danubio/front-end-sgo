import { useEffect } from 'react';
import { useEvents } from '../../../context/eventContext/useEvents';
import { TableFicha } from '../../componentesFicha/table';

export const ToListEventsContent = () => {
  const {
    loadEvents,
    events,
    eventById,
    uploadEvent,
    deleteEvent,
    loadEventsById,
  } = useEvents();


  // Defina as colunas desejadas e o mapeamento para as chaves dos eventos
  const columnsMap: { [key: string]: string } = {
    'Ord': 'id', // Exemplo: 'Ord' mapeia para 'id'
    'Título do Evento': 'nomeOperacao',
    'Data inicial': 'dataInicio',
    'Data final': 'dataFinal',
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
    <TableFicha
      columns={columns} // Use as colunas personalizadas
      registers={transformedEvents} // Use os registros transformados
      currentPosition={0}
      rowsPerLoad={0}
      isActions={true}
      label_tooltip={'Evento'}
      handleDelete={deleteEvent}
    />
  );
};
