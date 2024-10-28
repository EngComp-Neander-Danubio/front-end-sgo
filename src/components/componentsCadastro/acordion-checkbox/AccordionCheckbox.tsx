import React, { useCallback, useEffect, useState } from 'react';
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
  Spinner,
  Text,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { HiPlusCircle } from 'react-icons/hi';
import api from '../../../services/api';
import { useEvents } from '../../../context/eventContext/useEvents';
interface opmSon {
  u_uni_codigo: number;
  u_uni_sigla: string;
  u2_uni_codigo: number;
  u2_uni_nome: string;
  u2_uni_sigla: string;
  uni_prioridade: number;
}
interface opmSaPM {
  uni_codigo_pai: number;
  uni_codigo: number;
  uni_sigla: string;
  uni_nome: string;
  opm_filha?: opmSaPM[];
}

interface IAccordionCheckbox {
  handleDeleteOpmModal: (item: opmSaPM) => void;
  opm: opmSaPM[];
  children?: React.ReactNode;
}

export const AccordionCheckbox: React.FC<IAccordionCheckbox> = ({
  handleDeleteOpmModal,
  opm = [],
}) => {
  const { control, watch } = useFormContext();
  const { loadIdsFromOPMsChildren } = useEvents();
  //console.log(opm);
  return (
    <>
      <Flex flexDirection={'column'}>
        {opm.length > 0 ? (
          opm.map((item, index) => (
            <Accordion defaultIndex={[1]} allowMultiple>
              <AccordionItem border="none">
                <>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Checkbox
                        key={index}
                        size="md"
                        defaultChecked
                        onChange={async e => {
                          //await handleDeleteOpmModal(item);
                          if (e.currentTarget.checked)
                            !!e.currentTarget.checked;
                        }}
                        colorScheme={'green'}
                      >
                        <InputGroup>
                          <Controller
                            name={`input-${item?.uni_codigo}`}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <Input
                                value={
                                  item?.uni_sigla.includes('1ºCRPM') ||
                                  item?.uni_sigla.includes('2ºCRPM') ||
                                  item?.uni_sigla.includes('3ºCRPM') ||
                                  item?.uni_sigla.includes('4ºCRPM')
                                    ? `${item?.uni_sigla} - ${item?.uni_nome}`
                                    : item?.uni_nome || 'Item não encontrado'
                                }
                                onChange={e => onChange(e.target.value)}
                                border="none"
                                w="40vw"
                                h="2vh"
                              />
                            )}
                          />
                        </InputGroup>
                      </Checkbox>
                    </Box>
                    <AccordionIcon
                      as={HiPlusCircle}
                      color="#A0AEC0"
                      display={item?.opm_filha ? 'flex' : 'none'}
                      onClick={async () => {
                        await loadIdsFromOPMsChildren(item?.uni_codigo);
                      }}
                    />
                  </AccordionButton>
                  {item?.opm_filha && item?.opm_filha.length > 0 && (
                    <AccordionPanel pb={4}>
                      <AccordionCheckbox
                        handleDeleteOpmModal={handleDeleteOpmModal}
                        opm={item?.opm_filha}
                      />
                    </AccordionPanel>
                  )}
                </>
              </AccordionItem>
            </Accordion>
          ))
        ) : (
          <Text></Text>
        )}
      </Flex>
    </>
  );
};
{
  /* <Spinner alignSelf={'center'} size={'lg'} justifyContent={'center'} /> */
}
