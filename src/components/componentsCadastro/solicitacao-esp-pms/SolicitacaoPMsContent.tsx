import React from 'react';
import { Button, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import { TitlePerfil } from '../../componentesFicha/dadosDaFicha/titlePerfil';
import { DashButtons } from '../../componentesFicha/registrosMedicos/header';
import { TitleSolicitacoes } from '../../componentesFicha/registrosMedicos/title';
import { DadosFicha } from '../../ViewLogin';
import { TableSolicitacoes } from '../table-solicitacoes';
import { columnsMapMilitar } from '../../../types/typesMilitar';
import { ModalFormAddMilitar } from '../formEfetivo/ModalFormAddMilitar';
import { Pagination } from '../pagination/Pagination';
import { useSolicitacoesOPMPMs } from '../../../context/solicitacoesOPMPMsContext/useSolicitacoesOPMPMs';
import { IoIosSend } from 'react-icons/io';
interface IFlexCadastrar {
  isOpen: boolean;
  handleToggle: () => void;
}
export const SolicitacaoPMsContent: React.FC<IFlexCadastrar> = ({
  isOpen,
  handleToggle,
}) => {
  const {
    pms,
    handleClick,
    handleOnChange,
    handleOnSubmit,
    firstDataIndex,
    lastDataIndex,
    loadLessSolicitacoesOPMPMs,
    loadMoreSolicitacoesOPMPMs,
    loadPMByOPM,
    totalData,
    dataPerPage,
    deletePMByOPM,
  } = useSolicitacoesOPMPMs();

  const {
    isOpen: isOpenAlertSolicitacao,
    onOpen: onOpenAlertSolicitacao,
    onClose: onCloseAlertSolicitacao,
  } = useDisclosure();
  const {
    isOpen: isOpenFormAddMilitar,
    onOpen: onOpenFormAddMilitar,
    onClose: onCloseFormAddMilitar,
  } = useDisclosure();

  const transformedMiltitares = pms.map(militar => {
    const transformedMilitar: {
      [key: string]: any;
    } = {};
    Object.entries(columnsMapMilitar).forEach(([newKey, originalKey]) => {
      transformedMilitar[newKey] = militar[originalKey];
    });
    return transformedMilitar;
  });
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
          w={isOpen ? '83vw' : '91vw'}
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
          <TitleSolicitacoes label="Relação de Militares" />
        </Flex>

        <Flex
          borderBottom="1px solid rgba(0, 0, 0, 0.5)"
          boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
          borderRadius={'8px'}
          bg={'white'}
          p={4}
          //mt={4}
          //mb={4}
          w={isOpen ? '83vw' : '91vw'}
          transitionDuration="1.0s"
          flexDirection={'column'}
          overflowY={'auto'}
          //maxH={'20vh'}
        >
          <DashButtons
            openModalAdd={onOpenFormAddMilitar}
            openModalSend={onOpenAlertSolicitacao}
            handleClick={handleClick}
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
          />
          <Flex mt={2} flexDirection={'column'} w={'100%'}>
            <TableSolicitacoes
              isActions
              isOpen={isOpen}
              isView={true}
              columns={[
                'Matrícula',
                'Posto/Graduação',
                'Nome Completo',
                'Unidade',
              ]}
              registers={transformedMiltitares}
              //registers={handleSortByPostoGrad(transformedMiltitares, '1')}
              label_tooltip="Militar"
              height={'32vh'}
              handleDelete={deletePMByOPM}
            />
            <Pagination
              totalPages={totalData}
              dataPerPage={dataPerPage}
              firstDataIndex={firstDataIndex}
              lastDataIndex={lastDataIndex}
              loadLess={loadLessSolicitacoesOPMPMs}
              loadMore={loadMoreSolicitacoesOPMPMs}
            />
          </Flex>
        </Flex>
        <Flex
          p={4}
          mt={4}
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

      <ModalFormAddMilitar
        isOpen={isOpenFormAddMilitar}
        onOpen={onOpenFormAddMilitar}
        onClose={onCloseFormAddMilitar}
        uploadPM={loadPMByOPM}
      />
    </>
  );
};
