import { TableSolicitacoes } from '../table-solicitacoes';
import soli_data from '../../../assets/solicitacoes_pms.json';
import { useDisclosure } from '@chakra-ui/react';
import { ModalFormAddMilitar } from '../formEfetivo/ModalFormAddMilitar';
import { ModalAlertSolicitacaoPMs } from '../modal/ModalAlertSolicitacaoPMs';

export const ToListSolicitacoesPMsContent = () => {
  // Defina as colunas desejadas e o mapeamento para as chaves dos eventos
  const columnsMap: { [key: string]: string } = {
    Solicitação: 'solicitacao',
    Prazo: 'prazo',
    'Quantidade Total Efetivo': 'qtd_efetivo',
    'Quantidade Parcial Efetivo': 'qtd_parcial_efetivo',
    Status: 'status',
  };

  // Use o mapeamento para criar as colunas a serem exibidas
  const columns = Object.keys(columnsMap);

  // Transforme os registros dos eventos com as novas chaves
  const transformedSolis = soli_data.map(solicitacao => {
    const transformedSoli: { [key: string]: any } = {};
    Object.entries(columnsMap).forEach(([newKey, originalKey]) => {
      transformedSoli[newKey] = solicitacao[originalKey];
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
  return (
    <>
      <TableSolicitacoes
        columns={columns} // Use as colunas personalizadas
        registers={transformedSolis} // Use os registros transformados
        currentPosition={0}
        rowsPerLoad={0}
        isActions={true}
        label_tooltip={'Solicitação de PMs'}
        openModalAdd={onOpenFormAddMilitar}
        openModalSend={onOpenAlertSolicitacao}
      />
      <ModalFormAddMilitar
        isOpen={isOpenFormAddMilitar}
        onOpen={onOpenFormAddMilitar}
        onClose={onCloseFormAddMilitar}
      />
      <ModalAlertSolicitacaoPMs
        isOpen={isOpenAlertSolicitacao}
        onOpen={onOpenAlertSolicitacao}
        onClose={onCloseAlertSolicitacao}
      />
    </>
  );
};
