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
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
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
  const { control } = methodsInput;
  const [loadingResponse, setLoadingResponse] = useState<boolean>(false);

  useEffect(() => {
    const loadDefaultValues = async () => {
      const values = await Promise.all(
        opm.map(item => rec_opm_to_default_values(item)),
      );
      const currentValues = methodsInput.watch('uni_codigo') || [];
      const uniqueValues = [
        ...new Set([...currentValues, ...values.filter(Boolean)]),
      ];
      methodsInput.setValue('uni_codigo', uniqueValues);
    };

    loadDefaultValues();
  }, [methodsInput.setValue, methodsInput.watch, opm]);

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

  const rec_opm_to_default_values = async (opm: opmSaPM) => {
    if (!opm) return;
    if (opm.uni_codigo) return opm.uni_codigo;
    if (opm.opm_filha && Array.isArray(opm.opm_filha)) {
      await Promise.all(
        opm.opm_filha.map(opm_filha => rec_opm_to_default_values(opm_filha)),
      );
    }
    return opm.uni_codigo;
  };

  const handleLoadOpmFilhas = async (param: number) => {
    try {
      setLoadingResponse(true); // Começa o carregamento
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

      setDatasOpmFilhas(prev => [
        ...prev,
        ...updatedOpm.filter(item => !rec_add_opm(item.uni_codigo, prev)),
      ]);
    } catch (error) {
      console.error('Erro ao carregar as unidades:', error);
    } finally {
      setLoadingResponse(false); // Conclui o carregamento
    }
  };

  return (
    <FormControl>
      {opm?.map((item, index) => (
        <Accordion defaultIndex={[1]} allowMultiple key={index.toString()}>
          <AccordionItem border="none" w={'100%'}>
            {({ isExpanded }) => (
              <>
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
                          onChange={e => {
                            const isChecked = e.target.checked;
                            const currentValue = field?.value ?? [];
                            field.onChange(
                              isChecked
                                ? [...currentValue, item.uni_codigo]
                                : currentValue.filter(
                                    (codigo: number) =>
                                      codigo !== item.uni_codigo,
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
                    as={!isExpanded ? HiPlusCircle : HiMinusCircle}
                    color="#A0AEC0"
                    onClick={async () => {
                      await handleLoadOpmFilhas(item?.uni_codigo);
                    }}
                  />
                </AccordionButton>

                <AccordionPanel ml={'auto'}>
                  {loadingResponse ? (
                    <Center>
                      <Spinner
                        alignSelf={'center'}
                        size={'lg'}
                        justifyContent={'center'}
                      />
                    </Center>
                  ) : (
                    <AccordionCheckbox
                      setDatasOpmFilhas={setDatasOpmFilhas}
                      opm={item?.opm_filha}
                    />
                  )}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      ))}
    </FormControl>
  );
};
