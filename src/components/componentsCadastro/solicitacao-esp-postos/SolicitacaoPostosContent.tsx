import { Button, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import { DashButtons } from '../../componentesFicha/registrosMedicos/header';
import { TitlePerfil } from '../../componentesFicha/dadosDaFicha/titlePerfil';
import { TitleSolicitacoes } from '../../componentesFicha/registrosMedicos/title';
import { DadosFicha } from '../../ViewLogin';
import { FiSave } from 'react-icons/fi';
import { ModalFormAddPosto } from '../modal/ModalFormAddPosto';
import { TableSolicitacoes } from '../table-solicitacoes';
import { columnsMapPostos } from '../../../types/yupPostos/yupPostos';
import { Pagination } from '../pagination/Pagination';
import { useSolicitacoesOPMPostos } from '../../../context/solicitacoesOPMPostosContext/useSolicitacoesOPMPostos';
import { IoIosSend } from 'react-icons/io';
interface ISolicitacaoPostosContent {
  isOpen: boolean;
  handleToggle: () => void;
}
export const SolicitacaoPostosContent: React.FC<ISolicitacaoPostosContent> = props => {
  const {
    isOpen: isOpenAlertSolicitacao,
    onOpen: onOpenAlertSolicitacao,
    onClose: onCloseAlertSolicitacao,
  } = useDisclosure();
  const {
    isOpen: isOpenFormAddPosto,
    onOpen: onOpenFormAddPosto,
    onClose: onCloseFormAddPosto,
  } = useDisclosure();

  const {
    postos,
    dataPerPage,
    postosLocal,
    firstDataIndex,
    handleClick,
    handleOnChange,
    handleOnSubmit,
    lastDataIndex,
    loadLessSolicitacoesOPMPostos,
    loadMoreSolicitacoesOPMPostos,
    loadPostoByOPM,
    deletePostoByOPM,
    totalData,
  } = useSolicitacoesOPMPostos();
  const totalPages = totalData;
  const transformedPostos = postosLocal.map(posto => {
    const transformedPosto: {
      [key: string]: any;
    } = {};
    Object.entries(columnsMapPostos).forEach(([newKey, originalKey]) => {
      transformedPosto[newKey] = posto[originalKey];
    });
    return transformedPosto;
  });
  console.log(transformedPostos);
  return (
    <>
      <Flex h={'100%'} flexDirection={'column'}>
        <VStack spacing={2} p={4} alignItems="flex-start">
          <TitlePerfil />
        </VStack>

        <Flex
          borderBottom="1px solid rgba(0, 0, 0, 0.5)"
          boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
          borderRadius={'8px'}
          bg={'white'}
          p={4}
          mt={2}
          w={props.isOpen ? '83vw' : '91vw'}
          transitionDuration="1.0s"
          minH={'120px'}
          height={'content'}
          //align={{lg: 'center', md: 'center', sm: 'left'}}
          flexDirection={{ lg: 'row', md: 'row', sm: 'column' }}
          gap={{ lg: 2, md: 2, sm: 4 }}
        >
          <DadosFicha
            marginLeft={{ lg: 6, md: 6, sm: 0 }}
            align={{ lg: 'center', md: 'center', sm: 'left' }}
          />
        </Flex>

        <Flex
          /* borderBottom="1px solid rgba(0, 0, 0, 0.5)"
                    boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
                    borderRadius={'8px'} */
          bg={'white'}
          p={4}
          mt={2}
          width="100%"
        >
          <TitleSolicitacoes label="Relação de Postos de Serviço" />
        </Flex>

        {/* <TabFicha /> */}

        <Flex
          borderBottom="1px solid rgba(0, 0, 0, 0.5)"
          boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
          borderRadius={'8px'}
          bg={'white'}
          p={4}
          w={props.isOpen ? '83vw' : '91vw'}
          transitionDuration="1.0s"
          flexDirection={'column'}
          overflowY={'auto'}
        >
          <DashButtons
            openModalAdd={onOpenFormAddPosto}
            openModalSend={onOpenAlertSolicitacao}
            handleClick={handleClick}
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
          />
          <Flex mt={2} flexDirection={'column'} w={'100%'}>
            <TableSolicitacoes
              isOpen={props.isOpen}
              isActions
              isView={true}
              columns={[
                'Local',
                'Rua',
                'Número',
                'Bairro',
                'Cidade',
                'Modalidade',
                'Qtd Militares',
              ]}
              registers={transformedPostos}
              label_tooltip="Posto"
              height={'32vh'}
              handleDelete={deletePostoByOPM}
            />
            {/* Componente de paginação */}
            <Pagination
              totalPages={totalPages}
              dataPerPage={dataPerPage}
              firstDataIndex={firstDataIndex}
              lastDataIndex={lastDataIndex}
              loadLess={loadLessSolicitacoesOPMPostos}
              loadMore={loadMoreSolicitacoesOPMPostos}
            />
          </Flex>
        </Flex>
        <Flex
          p={4}
          //mt={1}
          flexDirection={'column'}
          align={'center'}
          justify={'center'}
        >
          <Button
            variant="ghost"
            bgColor=" #38A169"
            _hover={{
              bgColor: 'green',
              cursor: 'pointer',
              transition: '.5s',
            }}
            color="#fff"
            type="submit"
            //onClick={reset}
            rightIcon={<IoIosSend color="#fff" size="20px" />}
            w={200}
          >
            Enviar
          </Button>
        </Flex>
      </Flex>

      <ModalFormAddPosto
        isOpen={isOpenFormAddPosto}
        onOpen={onOpenFormAddPosto}
        onClose={onCloseFormAddPosto}
        uploadPosto={loadPostoByOPM}
      />
    </>
  );
};
