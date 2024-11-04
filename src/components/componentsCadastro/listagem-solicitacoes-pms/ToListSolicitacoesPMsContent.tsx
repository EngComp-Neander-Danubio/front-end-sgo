import { TableSolicitacoes } from '../table-solicitacoes';
import { Flex, useDisclosure } from '@chakra-ui/react';
import { ModalFormAddMilitar } from '../formEfetivo/ModalFormAddMilitar';
import { ModalAlertSolicitacaoPMs } from '../modal/ModalAlertSolicitacaoPMs';
import { Pagination } from '../pagination/Pagination';
import { useSolicitacoesPMs } from '../../../context/solicitacoesPMsContext/useSolicitacoesPMs';
import { ModalSolicitacarEfetivoRed } from '../modal/redistribuicao-efetivo/ModalSolicitarEfetivoRed';

// lista as solicitacoes da OPM no que se refere ao efetivo policial
export const ToListSolicitacoesPMsContent = () => {
  const {
    solicitacoesPMs,
    totalData,
    loadLessSolicitacoesPMs,
    loadMoreSolicitacoesPMs,
    firstDataIndex,
    lastDataIndex,
  } = useSolicitacoesPMs();
  const totalPages = totalData;
  // Defina as colunas desejadas e o mapeamento para as chaves dos eventos
  const columnsMap: { [key: string]: string } = {
    Operação: 'operacao',
    Solicitação: 'solicitacao',
    'Prazo Final': 'prazoFinal',
    //'Prazo Inicial': 'prazoInicial',
    'Quantidade Total Efetivo': 'qtd_efetivo',
    'Quantidade Parcial Efetivo': 'qtd_parcial_efetivo',
    OPM: 'OPM',
    Status: 'status',
  };
  // Use o mapeamento para criar as colunas a serem exibidas
  const columns = Object.keys(columnsMap);

  // Transforme os registros dos eventos com as novas chaves
  const transformedSolis = solicitacoesPMs.map(p => {
    const transformedSoli: { [key: string]: any } = {};
    Object.entries(columnsMap).forEach(([newKey, originalKey]) => {
      transformedSoli[newKey] = p[originalKey];
    });
    return transformedSoli;
  });
  const {
    isOpen: isOpenFormAddMilitar,
    onOpen: onOpenFormAddMilitar,
    onClose: onCloseFormAddMilitar,
  } = useDisclosure();
  const {
    isOpen: isOpenAlertSolicitacao,
    onOpen: onOpenAlertSolicitacao,
    onClose: onCloseAlertSolicitacao,
  } = useDisclosure();
  const {
    isOpen: isOpenFormRedSolEfetivo,
    onOpen: onOpenFormRedSolEfetivo,
    onClose: onCloseFormRedSolEfetivo,
  } = useDisclosure();

  return (
    <>
      <Flex flexDirection={'column'} w={'100%'}>
        <TableSolicitacoes
          columns={columns} // Use as colunas personalizadas
          registers={transformedSolis} // Use os registros transformados
          isActions={true}
          label_tooltip={'Solicitação de PMs'}
          openModalAdd={onOpenFormAddMilitar}
          //openModalSend={onOpenAlertSolicitacao}
          height={''}
          handleDelete={function(id?: string, index?: string): {} {
            throw new Error('Function not implemented.');
          }}
          openModalSend={onOpenFormRedSolEfetivo}
        />
        {/* Componente de paginação */}
        <Pagination
          totalPages={totalPages}
          dataPerPage={10}
          firstDataIndex={firstDataIndex}
          lastDataIndex={lastDataIndex}
          loadLess={loadLessSolicitacoesPMs}
          loadMore={loadMoreSolicitacoesPMs}
        />
        <ModalFormAddMilitar
          isOpen={isOpenFormAddMilitar}
          onOpen={onOpenFormAddMilitar}
          onClose={onCloseFormAddMilitar}
          uploadPM={function(data: any): Promise<void> {
            throw new Error('Function not implemented.');
          }}
        />
        <ModalAlertSolicitacaoPMs
          isOpen={isOpenAlertSolicitacao}
          onOpen={onOpenAlertSolicitacao}
          onClose={onCloseAlertSolicitacao}
        />
        <ModalSolicitacarEfetivoRed
          isOpen={isOpenFormRedSolEfetivo}
          onOpen={onOpenFormRedSolEfetivo}
          onClose={onCloseFormRedSolEfetivo}
        />
      </Flex>
    </>
  );
};
