import React, { useEffect } from 'react';
import {
  Flex,
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Thead,
  Tr,
  border,
  Td,
} from '@chakra-ui/react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import './table.modules.css';
import { ThTable } from './th';
import { TdTable } from './td';
import { IconeRelatorio, IconeEditar, IconeDeletar } from '../../ViewLogin';
import { IconeBusca } from '../registrosMedicos/icones/iconeBusca';

interface ITable {
  isOpen?: boolean;
  isActions?: boolean;
  columns?: string[]; // Array de strings que representa os nomes das colunas
  registers?: { [key: string]: any }[]; // Array de objetos, onde cada objeto representa uma linha e as chaves são os nomes das colunas
  moreLoad?: () => void;
  lessLoad?: () => void;
  currentPosition: number;
  rowsPerLoad: number;
  label_tooltip?: string;
}

export const TableFicha: React.FC<ITable> = ({
  isActions,
  columns,
  registers,
  moreLoad,
  lessLoad,
  currentPosition,
  rowsPerLoad,
  label_tooltip,
}) => {
  const start = currentPosition > 0 ? currentPosition - rowsPerLoad + 1 : 0;
  const end = currentPosition;
  return (
    <TableContainer pt={4} w="100%" transitionDuration="1.0s">
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
            {registers && registers.length > 0 && isActions && (
              <ThTable title="Ações" customIcon={undefined} />
            )}
          </Tr>
        </Thead>
        <Tbody>
          {registers?.map((register, index) => (
            <Tr key={index}>
              {columns?.map((column, i) => (
                <TdTable
                  key={column}
                  text={
                    typeof register[column] === 'string' ||
                    typeof register[column] === 'number'
                      ? register[column]
                      : JSON.stringify(register[column])
                  }
                />
              ))}
              <TdTable
                customIcons={
                  isActions
                    ? [
                        <IconeBusca
                          key="busca"
                          label_tooltip={`${label_tooltip}`}
                        />,
                        <IconeRelatorio
                          key="relatorio"
                          label_tooltip={`${label_tooltip}`}
                        />,
                        <IconeEditar
                          key="editar"
                          label_tooltip={`${label_tooltip}`}
                        />,
                        <IconeDeletar
                          key="deletar"
                          label_tooltip={`${label_tooltip}`}
                        />,
                      ]
                    : undefined
                }
              />
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
