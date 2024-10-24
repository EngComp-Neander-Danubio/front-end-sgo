import * as yup from 'yup';

const solicitacaoEfetivoSchema = yup.object().shape({
  dataInicio: yup.date().required('Campo obrigatório'),
  dataFinal: yup.date().required('Campo obrigatório'),
  opmsLabel: yup.array().of(yup.string().required('Campo obrigatório')).required('Campo obrigatório'),
  input: yup.array().of(yup.string().required('Campo obrigatório')).required('Campo obrigatório'),

});

export default solicitacaoEfetivoSchema;
