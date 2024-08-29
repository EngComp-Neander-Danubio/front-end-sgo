import * as yup from 'yup';
export const postosSchema = yup.object().shape({
  "local": yup.string().required('Campo obrigatório'),
  "rua": yup.string().required('Campo obrigatório'),
  "bairro": yup.string().required('Campo obrigatório'),
  "numero": yup.number().required('Campo obrigatório'),
  "cidade": yup.string().required('Campo obrigatório'),
});


export const columnsMapPostos: {
  [key: string]: string;
} = {
  //'Ord': 'id', // Exemplo: 'Ord' mapeia para 'id'
  'Local': 'Local',
  'Rua': 'Rua',
  'Número': 'Numero',
  'Bairro': 'Bairro',
  'Cidade': 'Cidade',
};
