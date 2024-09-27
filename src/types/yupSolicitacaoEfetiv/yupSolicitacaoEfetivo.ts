import * as yup from 'yup';

const solicitacaoEfetivoSchema = yup.object().shape({
  dataInicio: yup
    .date()
    .required('Data de início é obrigatória')
    .nullable(),
  dataFinal: yup
    .date()
    .required('Data final é obrigatória')
    .min(yup.ref('dataInicio'), 'Data final deve ser após a data de início')
    .nullable(),
  checkboxespecializadas: yup.boolean(),
  checkboxdgpi: yup.boolean(),
  checkbox1crpm: yup.boolean(),
  checkbox2crpm: yup.boolean(),
  checkbox3crpm: yup.boolean(),
  checkbox4crpm: yup.boolean(),
  checkboxcpchoque: yup.boolean(),
  checkboxcpraio: yup.boolean(),
  checkboxcpe: yup.boolean(),
  /* select_opm: yup
    .string()
    .required('Seleção de OPM é obrigatória'), */
  totalEfetivo: yup
    .number()
    .required('Total efetivo é obrigatório')
    .min(1, 'O valor mínimo é 1'),
});

export default solicitacaoEfetivoSchema;
