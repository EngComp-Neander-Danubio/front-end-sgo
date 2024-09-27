import soli_data from '../../../assets/solitacoes_postos.json';
import { useState } from 'react';
import { Button, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import { DashButtons } from '../../componentesFicha/registrosMedicos/header';
import { TitlePerfil } from '../../componentesFicha/dadosDaFicha/titlePerfil';
import { TitleSolicitacoes } from '../../componentesFicha/registrosMedicos/title';
import { TableFicha } from '../../componentesFicha/table';
import { DadosFicha } from '../../ViewLogin';
import { ModalFormAddMilitar } from '../formEfetivo/ModalFormAddMilitar';
import { ModalAlertSolicitacaoPMs } from '../modal/ModalAlertSolicitacaoPMs';
import { ModalFormAddPosto } from '../modal/ModalFormAddPosto';
import { TableSolicitacoes } from '../table-solicitacoes';
import { IoIosSend } from 'react-icons/io';
import { usePostos } from '../../../context/postosContext/usePostos';
import { columnsMapPostos } from '../../../types/yupPostos/yupPostos';
interface IFlexCadastrar {
  isOpen: boolean;
  handleToggle: () => void;
}
export const SolicitacaoPostosContent: React.FC<IFlexCadastrar> = props => {
  const { postos, handleClick, handleOnChange, handleOnSubmitP } = usePostos();

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

  const transformedPostos = postos.map(posto => {
    const transformedPosto: {
      [key: string]: any;
    } = {};
    Object.entries(columnsMapPostos).forEach(([newKey, originalKey]) => {
      transformedPosto[newKey] = posto[originalKey];
    });
    return transformedPosto;
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
          w={props.isOpen ? '83vw' : '91vw'}
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
          <TitleSolicitacoes label="Relação de Postos de Serviço" />
        </Flex>

        {/* <TabFicha /> */}

        <Flex
          borderBottom="1px solid rgba(0, 0, 0, 0.5)"
          boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.5)"
          borderRadius={'8px'}
          bg={'white'}
          p={4}
          mt={4}
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
            handleOnSubmit={handleOnSubmitP}
          />
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
            ]}
            registers={transformedPostos}
            currentPosition={0}
            rowsPerLoad={0}
            label_tooltip="Posto"
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

      <ModalFormAddPosto
        isOpen={isOpenFormAddPosto}
        onOpen={onOpenFormAddPosto}
        onClose={onCloseFormAddPosto}
      />
    </>
  );
};
