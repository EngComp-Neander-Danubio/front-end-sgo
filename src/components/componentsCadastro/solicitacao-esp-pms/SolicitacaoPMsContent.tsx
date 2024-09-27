import React from 'react';
import { Button, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import { IoIosSend } from 'react-icons/io';
import { TitlePerfil } from '../../componentesFicha/dadosDaFicha/titlePerfil';
import { DashButtons } from '../../componentesFicha/registrosMedicos/header';
import { TitleSolicitacoes } from '../../componentesFicha/registrosMedicos/title';
import { DadosFicha } from '../../ViewLogin';
import { TableSolicitacoes } from '../table-solicitacoes';
import { useMilitares } from '../../../context/militares/useMilitares';
import {
  columnsMapMilitar,
  handleSortByPostoGrad,
} from '../../../types/typesMilitar';
import { ModalFormAddMilitar } from '../formEfetivo/ModalFormAddMilitar';
interface IFlexCadastrar {
  isOpen: boolean;
  handleToggle: () => void;
}
export const SolicitacaoPMsContent: React.FC<IFlexCadastrar> = ({
  isOpen,
  handleToggle,
}) => {
  const {
    militares,
    militaresByAPI,
    currentPositionMilitar,
    loadLessMilitar,
    loadMoreMilitar,
    handleClickMilitar,
    handleOnChangeMilitar,
    handleOnSubmitMilitar,
  } = useMilitares();
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

  const transformedMiltitares = militares.map(militar => {
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
        <VStack spacing={6} mt={4} p={4} alignItems="flex-start">
          <TitlePerfil />
        </VStack>

        <Flex
          borderBottom="1px solid rgba(0, 0, 0, 0.5)"
          boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
          borderRadius={'8px'}
          bg={'white'}
          p={4}
          mt={4}
          w={isOpen ? '83vw' : '91vw'}
          transitionDuration="1.0s"
          minH={'120px'}
          height={'content'}
          //align={{lg: 'center', md: 'center', sm: 'left'}}
          flexDirection={{ lg: 'row', md: 'row', sm: 'column' }}
          gap={{ lg: 2, md: 2, sm: 4 }}
        >
          <DadosFicha
            ml={{ lg: '', md: '', sm: '2' }}
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
          mt={4}
          width="100%"
        >
          <TitleSolicitacoes label="Relação de Militares" />
        </Flex>

        {/* <TabFicha /> */}

        <Flex
          borderBottom="1px solid rgba(0, 0, 0, 0.5)"
          boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
          borderRadius={'8px'}
          bg={'white'}
          p={4}
          mt={4}
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
            handleClick={handleClickMilitar}
            handleOnChange={handleOnChangeMilitar}
            handleOnSubmit={handleOnSubmitMilitar}
          />
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
            registers={handleSortByPostoGrad(transformedMiltitares, '1')}
            currentPosition={0}
            rowsPerLoad={0}
            label_tooltip="Militar"
          />
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
            bgColor="#38A169"
            color="#fff"
            type="submit"
            //onClick={reset}
            rightIcon={<IoIosSend color="#fff" size="20px" />}
            w={200}
          >
            Salvar
          </Button>
        </Flex>
      </Flex>

      <ModalFormAddMilitar
        isOpen={isOpenFormAddMilitar}
        onOpen={onOpenFormAddMilitar}
        onClose={onCloseFormAddMilitar}
      />
    </>
  );
};
