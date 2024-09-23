import React, { useEffect, useState } from 'react';
import {
  Flex,
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Thead,
  Tr,
  Td,
  Checkbox,
  Th,
  Input,
} from '@chakra-ui/react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import './table.modules.css';
import { ThTable } from './th';
import { TdTable } from './td';
import { IconeDeletar } from '../../ViewLogin';
import { columnsMapOPMs, OPMs } from '../../../types/typesOPM';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { inputSchema } from '../../../types/yupSchema/yupInput';
import { useEfetivoOPMs } from '../../../context/efetivoOPMs/useEfetivoOPMs';

interface ITable {
  isOpen?: boolean;
  isActions?: boolean;
  columns: string[]; // Array de strings que representa os nomes das colunas
  registers: { [key: string]: any }[]; // Array de objetos, onde cada objeto representa uma linha e as chaves são os nomes das colunas
  moreLoad?: () => void;
  lessLoad?: () => void;
  currentPosition: number;
  rowsPerLoad: number;
  label_tooltip?: string;
  handleDelete?: () => {};
  handleInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate?: (data: any, id: string) => Promise<void>;
  isCheckBox?: boolean;
  customIcons?: React.ReactNode[];
  handleDeleteOpm: (option: any) => void;
}
export type IForm = {
  dateFirst: Date;
  dateFinish: Date;
  input: string[];
};
export const NewTableOPMs: React.FC<ITable> = ({
  isActions,
  isCheckBox,
  columns,
  registers,
  moreLoad,
  lessLoad,
  currentPosition,
  rowsPerLoad,
  label_tooltip,
  handleDelete,
  handleInput,
  handleDeleteOpm,
  customIcons,
}) => {
  const { control } = useFormContext();
  const {
    fields,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
    replace,
  } = useFieldArray({
    control,
    name: 'input',
  });
  const [inputItems, setInputItems] = useState<string[]>(
    Array(registers.length).fill(''), // Inicializa com strings vazias
  );
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(registers.length).fill(false),
  );

  const start = currentPosition > 0 ? currentPosition - rowsPerLoad + 1 : 0;
  const end = currentPosition;

  const handleInputChange = (index: any) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedInputItems = [...inputItems];
    updatedInputItems[index] = e.target.value;
    setInputItems(updatedInputItems);
  };

  // Handler para selecionar/desmarcar todos os checkboxes
  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsAllChecked(checked);
    setCheckedItems(Array(registers.length).fill(checked));
  };

  // Handler para selecionar/desmarcar um checkbox individual
  const handleCheck = (index: number) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[index] = e.target.checked;
    setCheckedItems(updatedCheckedItems);

    // Se todos os itens estão selecionados, também marca o checkbox geral
    setIsAllChecked(updatedCheckedItems.every(Boolean));
  };

  const transformedOpm = registers.map(opm => {
    const transformedOPM: { [key: string]: any } = {};
    Object.entries(columnsMapOPMs).forEach(([newKey, originalKey]) => {
      transformedOPM[newKey] = opm[originalKey];
    });
    return transformedOPM;
  });

  return (
    <>
      <Flex overflowY={'auto'} w="100%">
        <TableContainer
          pt={4}
          w="100%"
          transitionDuration="1.0s"
          h={registers.length > 0 ? '30vh' : 'fit-content'}
          maxH={'60vh'}
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
                    disabled={currentPosition <= rowsPerLoad}
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
                {isCheckBox && (
                  <>
                    <Flex align={'center'} justify={'center'}>
                      <Checkbox
                        isChecked={isAllChecked}
                        onChange={handleCheckAll}
                        //borderColor={'red'}
                      />
                      <ThTable
                        title={'Total Efetivo'}
                        customIcon={undefined}
                      ></ThTable>
                    </Flex>
                  </>
                )}
                {columns.map(column => (
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
              {fields.map((item, index) => (
                <Tr key={item.id}>
                  <Td>
                    <Flex
                      align={'center'}
                      justify={'center'}
                      //border={'1px solid red'}
                      gap={2}
                    >
                      <>
                        <Checkbox
                          isChecked={checkedItems[index]}
                          onChange={handleCheck(index)}
                        />
                        <Controller
                          name={`input.${index}` as const}
                          control={control}
                          render={({
                            field: { onChange, onBlur, value, ref },
                            fieldState: { error },
                          }) => (
                            <Input
                              w={'5.5vw'}
                              h={'30px'}
                              value={value}
                              onChange={onChange}
                              onBlur={onBlur}
                              ref={ref}
                            />
                          )}
                        />
                      </>
                    </Flex>
                  </Td>

                  {columns.map((column, index) => (
                    <>
                      <TdTable key={column} text={register[index]} />
                    </>
                  ))}
                  {isActions &&
                    columns.map((column, index) => (
                      <TdTable
                        key={index}
                        customIcons={[
                          <IconeDeletar
                            label_tooltip="OPM"
                            handleDelete={async (): Promise<void> => {
                              console.log(register);
                              remove(index);
                            }}
                          />,
                        ]}
                      />
                    ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};
