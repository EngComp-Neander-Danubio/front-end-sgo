import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
  Center,
  FormControl,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';
import { HiPlusCircle } from 'react-icons/hi';
import api from '../../../services/api';

type opmSaPM = {
  uni_codigo_pai: number;
  uni_codigo: number;
  uni_sigla: string;
  uni_nome: string;
  opm_filha: opmSaPM[];
};
interface IAccordionCheckbox {
  setDatasOpmFilhas: React.Dispatch<React.SetStateAction<opmSaPM[]>>;
  opm: opmSaPM[];
  children?: React.ReactNode;
}
export const AccordionCheckbox: React.FC<IAccordionCheckbox> = ({
  setDatasOpmFilhas,
  opm = [],
}) => {
  const methodsInput = useFormContext();

  console.log({
    values: methodsInput.watch(),
    opm,
  });

  const { control } = methodsInput;
  const [loadingResponse, setResponseLoading] = useState<boolean>();
  /* useEffect(() => {
    opm.forEach(o => {
      const currentValues = methodsInput.getValues('uni_codigo') || [];
      methodsInput.setValue('uni_codigo', [...currentValues, o.uni_codigo]);
    });
  }, [methodsInput.getValues('uni_codigo').length]); */
  /* useEffect(() => {
    const loadDefaultValues = async () => {
      const values = await Promise.all(
        opm.map(item => rec_opm_to_default_values(item)),
      );
      methodsInput.setValue('uni_codigo', values.filter(Boolean));
    };

    loadDefaultValues();
  }, [opm, methodsInput.setValue]); */

  const rec_opm = async (param: number, new_opm: opmSaPM[], opm: opmSaPM) => {
    if (!opm) return;

    const opmForm = new_opm.map(o => ({
      ...o,
      opm_filha: o.opm_filha || [],
    }));

    if (opm.uni_codigo === param) {
      opm.opm_filha = opmForm;
      return opm;
    }
    if (opm.opm_filha && Array.isArray(opm.opm_filha)) {
      await Promise.all(
        opm.opm_filha.map(async opm_filha => {
          await rec_opm(param, opmForm, opm_filha);
        }),
      );
    }
    return;
  };

  const rec_opm_to_default_values = (opm: opmSaPM) => {
    if (!opm) return 0;
    if (opm.opm_filha) {
      rec_opm_to_default_values((opm.opm_filha as unknown) as opmSaPM);
    }
    if (opm.opm_filha && opm.uni_codigo) return opm.uni_codigo;
  };

  const handleLoadOpmFilhas = async (param: number) => {
    try {
      if (!opm || opm.length === 0) return;
      const response = await api.get<opmSaPM[]>(`/unidadesfilhas/${param}`);
      const updatedOpm = await Promise.all(
        opm.map(async o => {
          const result = await rec_opm(param, response.data, o);
          return result ?? o;
        }),
      );

      const rec_add_opm = (
        param: number,
        opm: opmSaPM | opmSaPM[] | undefined,
      ): boolean => {
        if (!opm) return false;

        if (Array.isArray(opm)) {
          return opm.some(filha => rec_add_opm(param, filha));
        }
        if (opm.uni_codigo === param) {
          return true;
        }
        return opm.opm_filha ? rec_add_opm(param, opm.opm_filha) : false;
      };
      setResponseLoading(true);
      setDatasOpmFilhas(prev => [
        ...prev,
        ...updatedOpm.filter(item => !rec_add_opm(item.uni_codigo, prev)),
      ]);
    } catch (error) {
      setResponseLoading(false);
      console.error('Erro ao carregar as unidades:', error);
    }
  };

  return (
    <FormControl>
      {opm?.map((item, index) => (
        <Accordion defaultIndex={[1]} allowMultiple>
          <AccordionItem border="none" w={'100%'} key={index.toString()}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Controller
                  name={`uni_codigo`}
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      size="md"
                      colorScheme="green"
                      isChecked={field.value?.includes(item?.uni_codigo)}
                      //defaultChecked
                      onChange={e => {
                        const isChecked = e.target.checked;
                        const currentValue = field?.value ?? [];
                        field.onChange(
                          isChecked
                            ? [...currentValue, item.uni_codigo]
                            : currentValue.filter(
                                (codigo: number) => codigo !== item.uni_codigo,
                              ),
                        );
                      }}
                    >
                      {item?.uni_sigla}
                    </Checkbox>
                  )}
                />
              </Box>
              <AccordionIcon
                as={HiPlusCircle}
                color="#A0AEC0"
                display={item?.opm_filha ? 'flex' : 'none'}
                onClick={async () => {
                  await handleLoadOpmFilhas(item?.uni_codigo);
                }}
              />
            </AccordionButton>

            {item?.opm_filha && loadingResponse ? (
              <AccordionPanel ml={'auto'}>
                <AccordionCheckbox
                  setDatasOpmFilhas={setDatasOpmFilhas}
                  opm={item?.opm_filha}
                />
              </AccordionPanel>
            ) : (
              <AccordionPanel ml={'auto'}>
                <Center>
                  <Spinner
                    alignSelf={'center'}
                    size={'lg'}
                    justifyContent={'center'}
                  />
                </Center>
              </AccordionPanel>
            )}
          </AccordionItem>
        </Accordion>
      ))}
    </FormControl>
  );
};
