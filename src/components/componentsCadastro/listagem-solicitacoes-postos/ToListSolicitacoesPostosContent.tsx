import { TableSolicitacoes } from '../table-solicitacoes';
import soli_data from '../../../assets/solitacoes_postos.json';
import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { ModalFormAddPosto } from '../modal/ModalFormAddPosto';

export const ToListSolicitacoesPostosContent = () => {
  const [data, setData] = useState(soli_data);

  // Defina as colunas desejadas e o mapeamento para as chaves dos eventos
  const columnsMap: { [key: string]: string } = {
    Solicitação: 'solicitacao',
    'Prazo Final': 'prazo',
    'Quantidade de postos': 'qtd_postos',
    Status: 'status',
  };

  // Use o mapeamento para criar as colunas a serem exibidas
  const columns = Object.keys(columnsMap);

  // Transforme os registros dos eventos com as novas chaves
  const transformedPostos = data.map(p => {
    const transformedPosto: { [key: string]: any } = {};
    Object.entries(columnsMap).forEach(([newKey, originalKey]) => {
      transformedPosto[newKey] = p[originalKey];
    });
    return transformedPosto;
  });
  const {
    isOpen: isOpenFormAddPosto,
    onOpen: onOpenFormAddPosto,
    onClose: onCloseFormAddPosto,
  } = useDisclosure();
  return (
    <>
      <TableSolicitacoes
        columns={columns} // Use as colunas personalizadas
        registers={transformedPostos} // Use os registros transformados
        currentPosition={0}
        rowsPerLoad={0}
        isActions={true}
        label_tooltip={'Solicitação de Postos'}
        openModalAdd={onOpenFormAddPosto}
      />
      <ModalFormAddPosto
        isOpen={isOpenFormAddPosto}
        onOpen={onOpenFormAddPosto}
        onClose={onCloseFormAddPosto}
      />
    </>
  );
};
