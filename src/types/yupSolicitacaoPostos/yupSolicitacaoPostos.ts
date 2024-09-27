import * as yup from 'yup';

export const solicitacaoPostosSchema = yup.object().shape({
  dataInicio: yup.date().required('Campo obrigatório'),
  dataFinal: yup.date().required('Campo obrigatório'),
  opmsLabel: yup.array().of(yup.string()).required('Campo obrigatório'),
});
