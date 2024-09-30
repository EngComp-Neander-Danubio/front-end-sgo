import React from 'react';
import {
  Flex,
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import './table.modules.css';
import { ThTable } from './th';
import { TdTable } from './td';
import { BotaoAlert, IconeDeletar, IconeEditar } from '../../ViewLogin';
import { ModalFormAddEvent } from '../modal/ModalFormAddEvent';
import { useEvents } from '../../../context/eventContext/useEvents';
import { useNavigate } from 'react-router-dom';
import { IconeVisualizar } from '../../componentesFicha/registrosMedicos/icones/iconeVisualizarSolicitacao';
import { IconeCadastrarSol } from '../../componentesFicha/registrosMedicos/icones/iconeCadastrarSolicitacao';
import { IconeEnviar } from '../../componentesFicha/registrosMedicos/icones/iconeEnviar';
import { IconeRedistribuir } from '../../componentesFicha/registrosMedicos/icones/iconeRedistribuir';
import { BotaoPendente } from '../../componentesFicha/registrosMedicos/buttons/buttonPendente';
import { BotaoAtual } from '../../componentesFicha/registrosMedicos/buttons/buttonAtual';

interface ITable {
  isOpen?: boolean;
  isView?: boolean;
  isActions?: boolean;
  columns: string[]; // Array de strings que representa os nomes das colunas
  registers: { [key: string]: any }[]; // Array de objetos, onde cada objeto representa uma linha e as chaves são os nomes das colunas
  moreLoad?: () => void;
  lessLoad?: () => void;
  currentPosition: number;
  rowsPerLoad: number;
  label_tooltip?: string;
  handleDelete?: () => {};
  handleUpdate?: (data: any, id: string) => Promise<void>;
  isCheckBox?: boolean;
  //customIcons?: React.ReactNode[];
  openModalAdd?: () => void;
  openModalSend?: () => void;
}

export const TableSolicitacoes: React.FC<ITable> = ({
  isActions,
  isView,
  isCheckBox,
  columns,
  registers,
  moreLoad,
  lessLoad,
  currentPosition,
  rowsPerLoad,
  label_tooltip,
  handleDelete,
  openModalAdd,
  openModalSend,
}) => {
  const start = currentPosition > 0 ? currentPosition - rowsPerLoad + 1 : 0;
  const end = currentPosition;
  const {
    isOpen: isOpenFormEditarEvent,
    onOpen: onOpenFormEditarEvent,
    onClose: onCloseFormEditarEvent,
  } = useDisclosure();
  const navigate = useNavigate();
  return (
    <>
      <Flex overflowY={'auto'} w="100%">
        <TableContainer
          pt={6}
          w="100%"
          transitionDuration="1.0s"
          //h={'60vh'}
          h={registers.length > 0 ? '70vh' : 'fit-content'}
          overflowY={'auto'}
        >
          <Table variant="simple">
            <TableCaption textAlign="left" p={0}>
              <Flex justify="space-between">
                {start}-{end} de {currentPosition} itens
                <Flex p={0} color="rgba(52, 64, 84, 1)">
                  <Button
                    mr={2}
                    fontSize="12px"
                    fontWeight="none"
                    bg="none"
                    border="1px solid"
                    borderColor="rgba(208, 213, 221, 1)"
                    borderRadius="8px"
                    color="rgba(52, 64, 84, 1)"
                    onClick={lessLoad}
                    disabled={currentPosition <= rowsPerLoad} // Desabilita se estiver na primeira página
                  >
                    Anterior
                  </Button>
                  <Button
                    ml={2}
                    fontSize="12px"
                    fontWeight="none"
                    bg="none"
                    border="1px solid"
                    borderColor="rgba(208, 213, 221, 1)"
                    color="rgba(52, 64, 84, 1)"
                    borderRadius="8px"
                    onClick={moreLoad}
                  >
                    Próximo
                  </Button>
                </Flex>
              </Flex>
            </TableCaption>

            <Thead>
              {/* {registers && registers.length > 0 && isCheckBox && (
                <ThTable title="CheckBox" customIcon={undefined} />
              )} */}
              <Tr
                borderTop="1px solid rgba(234, 236, 240, 1)"
                borderBottom="1px solid rgba(234, 236, 240, 1)"
                bg="rgba(252, 252, 253, 1)"
              >
                {columns?.map(column => (
                  <ThTable
                    key={column}
                    title={column}
                    customIcon={<AiOutlineArrowDown />}
                  />
                ))}
                {isActions && <ThTable title="Ações" customIcon={undefined} />}
              </Tr>
            </Thead>
            <Tbody>
              {registers?.map((register, index) => (
                <Tr key={index}>
                  {columns?.map(column => (
                    <TdTable
                      key={column}
                      text={
                        typeof register[column] === 'string' ||
                        typeof register[column] === 'number'
                          ? register[column] === 'Pendente' ||
                            register[column] === 'Completa' ||
                            register[column] === 'Alerta'
                            ? ''
                            : register[column]
                          : typeof register[column] === 'object'
                          ? JSON.stringify(register[column])
                          : ''
                      }
                      customIcons={[
                        register[column] === 'Pendente' ? (
                          <BotaoAlert text="Pendente" />
                        ) : register[column] === 'Completa' ? (
                          <BotaoAlert text="Completa" />
                        ) : register[column] === 'Alerta' ? (
                          <BotaoAlert text="Alerta" />
                        ) : null,
                      ]}
                    />
                  ))}
                  <TdTable
                    customIcons={
                      isActions &&
                      label_tooltip?.includes('Solicitação de Postos')
                        ? [
                            <IconeVisualizar
                              key="viewPostos"
                              label_tooltip={label_tooltip}
                              onOpen={() => navigate('/viewSolicitacaoPostos')}
                            />,
                          ]
                        : !isView
                        ? [
                            <IconeVisualizar
                              key="viewPMs"
                              label_tooltip={label_tooltip}
                              onOpen={() => navigate('/viewSolicitacaoPMs')}
                            />,
                            <IconeRedistribuir
                              key="redistribuir"
                              label_tooltip={label_tooltip}
                            />,
                          ]
                        : isView &&
                          label_tooltip?.includes('Solicitações de Postos')
                        ? [
                            <IconeDeletar
                              key="Deletar"
                              label_tooltip={label_tooltip}
                            />,
                            <IconeEditar
                              key="Editar"
                              label_tooltip={label_tooltip}
                            />,
                          ]
                        : [
                            <IconeDeletar
                              key="Deletar"
                              label_tooltip={label_tooltip}
                            />,
                            <IconeEditar
                              key="Editar"
                              label_tooltip={label_tooltip}
                            />,
                          ]
                    }
                  />
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <ModalFormAddEvent
        isOpen={isOpenFormEditarEvent}
        onOpen={onOpenFormEditarEvent}
        onClose={onCloseFormEditarEvent}
      />
    </>
  );
};
