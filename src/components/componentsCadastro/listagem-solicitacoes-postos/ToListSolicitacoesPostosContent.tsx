import { TableSolicitacoes } from '../table-solicitacoes';
import { Flex, useDisclosure } from '@chakra-ui/react';
import { Pagination } from '../pagination/Pagination';
import { useSolicitacoesPostos } from '../../../context/solicitacoesPostosContext/useSolicitacoesPostos';
import { ModalSolicitacarPostosRed } from '../modal/redistribuicao-postos/ModalSolicitarPostosRed';

// lista as solicitacoes da OPM no que se refere ao posto de serviço
export const ToListSolicitacoesPostosContent = () => {
  const {
    solicitacoesPostos,
    totalData,
    firstDataIndex,
    lastDataIndex,
    dataPerPage,
    loadLessSolicitacoesPostos,
    loadMoreSolicitacoesPostos,
  } = useSolicitacoesPostos();

  // Defina as colunas desejadas e o mapeamento para as chaves dos eventos
  const columnsMap: { [key: string]: string } = {
    Operação: 'operacao',
    Solicitação: 'solicitacao',
    'Prazo Final': 'prazo',
    'Quantidade de postos': 'qtd_postos',
    OPM: 'OPM',
    Status: 'status',
  };

  // Use o mapeamento para criar as colunas a serem exibidas
  const columns = Object.keys(columnsMap);

  // Transforme os registros dos eventos com as novas chaves
  const transformedPostos = solicitacoesPostos.map(p => {
    const transformedPosto: { [key: string]: any } = {};
    Object.entries(columnsMap).forEach(([newKey, originalKey]) => {
      transformedPosto[newKey] = p[originalKey];
    });
    return transformedPosto;
  });

  const {
    isOpen: isOpenFormRedSolPosto,
    onOpen: onOpenFormRedSolPosto,
    onClose: onCloseFormRedSolPosto,
  } = useDisclosure();
  return (
    <>
      <Flex flexDirection={'column'} w={'100%'}>
        {/* Tabela de solicitações de postos */}
        <TableSolicitacoes
          columns={columns} // Use as colunas personalizadas
          registers={transformedPostos} // Use os registros transformados
          isActions={true}
          label_tooltip={'Solicitação de Postos'}
          height={'60vh'}
          handleDelete={function(id?: string, index?: string): {} {
            throw new Error('Function not implemented.');
          }}
          openModalSend={onOpenFormRedSolPosto}
        />

        {/* Componente de paginação */}
        <Pagination
          totalPages={totalData}
          dataPerPage={dataPerPage}
          firstDataIndex={firstDataIndex}
          lastDataIndex={lastDataIndex}
          loadLess={loadLessSolicitacoesPostos}
          loadMore={loadMoreSolicitacoesPostos}
        />
      </Flex>
      <ModalSolicitacarPostosRed
        isOpen={isOpenFormRedSolPosto}
        onOpen={onOpenFormRedSolPosto}
        onClose={onCloseFormRedSolPosto}
      />
    </>
  );
};
