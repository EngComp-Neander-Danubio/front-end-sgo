import { useEffect } from 'react';
import { useEvents } from '../../../context/eventContext/useEvents';
import { TableFicha } from '../../componentesFicha/table';

export const ToListEventsContent = () => {
  const { loadEvents, events } = useEvents();
  const headerKeys = events.length > 0 ? Object.keys(events[0]) : [];
  useEffect(() => {
    loadEvents();
  }, []);
  return (
    <TableFicha
      registers={events}
      columns={headerKeys}
      currentPosition={0}
      rowsPerLoad={0}
      isActions={true}
      label_tooltip={'Evento'}
    />
  );
};
