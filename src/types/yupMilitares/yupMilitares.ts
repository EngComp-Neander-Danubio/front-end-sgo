import * as yup from 'yup';
export const militarSchema = yup.object().shape({
  'nome_completo': yup.string().required('Campo obrigatório'),
  'opm': yup.string().required('Campo obrigatório'),
  'matricula': yup.string().required('Campo obrigatório'),
  'posto_grad': yup.string().required('Campo obrigatório'),
  'uni_codigo': yup.array().of(yup.number().required('Campo obrigatório')).required('Campo obrigatório'),

});

/* const headerKeys =
  postos.length > 0
    ? Object.keys(postos[0]).filter(key =>
      ['Local', 'Rua', 'Numero', 'Bairro', 'Cidade'].includes(key),
    )
    : [];
const headerKeysMilitar =
  militares.length > 0
    ? Object.keys(militares[0]).filter(key =>
      ['matricula', 'posto_grad', 'nome_completo', 'opm'].includes(key),
    )
    : []; */
