import * as yup from 'yup';
export const solicitacaoPostosSchema = yup.object().shape({
  dataInicio: yup.date().required('Campo obrigatório'),
  dataFinal: yup.date().required('Campo obrigatório'),
  //uni_codigo: yup.array().of(yup.string().required('Campo obrigatório')).required('Campo obrigatório'),
  operacao_id: yup.string().optional(),
  select_opm: yup.string().optional(),
});
