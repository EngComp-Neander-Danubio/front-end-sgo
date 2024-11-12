import * as yup from 'yup';

const solicitacaoEfetivoSchema = yup.object().shape({
  dataInicio: yup.date().required('Campo obrigatório'),
  dataFinal: yup.date().required('Campo obrigatório'),
  uni_codigo: yup.array().of(yup.number().required('Campo obrigatório')).required('Campo obrigatório'),
  efetivo: yup.array().of(yup.number().required('Campo obrigatório')).required('Campo obrigatório'),
  totalEfetivo: yup.number().optional(),
  operacao_id: yup.string().optional(),
});

export default solicitacaoEfetivoSchema;
