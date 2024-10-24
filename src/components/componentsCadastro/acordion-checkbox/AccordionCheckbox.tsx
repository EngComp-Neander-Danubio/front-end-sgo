import React from 'react';
import {
  Flex,
  Input,
  Checkbox,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  InputGroup,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { HiPlusCircle } from 'react-icons/hi';

type opmSaPM = {
  uni_codigo_pai: number;
  uni_codigo: number;
  uni_sigla: string;
  uni_nome: string;
  // Adicionamos o campo 'filhas' para permitir a recursividade
};

interface IAccordionCheckbox {
  handleDeleteOpmModal: (item: opmSaPM) => void;
  dataOPMs?: opmSaPM[];
  children?: React.ReactNode;
  filhas: opmSaPM[];
}

export const AccordionCheckbox: React.FC<IAccordionCheckbox> = ({
  handleDeleteOpmModal,
  dataOPMs,
  filhas,
  children,
}) => {
  const { control } = useFormContext();

  return (
    <>
      {dataOPMs?.map((item, index) => (
        <Flex key={index}>
          <Controller
            name={`opmsLabel.${index}`}
            control={control}
            render={({ field: { onBlur, onChange } }) => (
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem border="none">
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Checkbox
                        size="md"
                        isChecked
                        onBlur={onBlur}
                        onChange={async () => handleDeleteOpmModal(item)}
                        colorScheme="green"
                      >
                        <InputGroup>
                          <Input
                            value={
                              item.uni_sigla.includes('1ºCRPM') ||
                              item.uni_sigla.includes('2ºCRPM') ||
                              item.uni_sigla.includes('3ºCRPM') ||
                              item.uni_sigla.includes('4ºCRPM')
                                ? `${item.uni_sigla} - ${item.uni_nome}`
                                : item.uni_nome || 'Item não encontrado'
                            }
                            onChange={e => onChange(e.target.value)}
                            border="none"
                            w="40vw"
                            h="2vh"
                          />
                        </InputGroup>
                      </Checkbox>
                    </Box>
                    <AccordionIcon as={HiPlusCircle} color="#A0AEC0" />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    {children}
                    {/* Verificamos se o item tem filhas e renderizamos o componente recursivamente */}
                    {filhas && filhas.length > 0 && (
                      <AccordionCheckbox
                        handleDeleteOpmModal={handleDeleteOpmModal}
                        dataOPMs={filhas}
                        filhas={[]}
                      />
                    )}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            )}
          />
        </Flex>
      ))}
    </>
  );
};
