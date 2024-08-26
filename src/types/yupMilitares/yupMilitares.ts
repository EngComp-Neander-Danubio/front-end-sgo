import * as yup from 'yup';
export const militarSchema = yup.object().shape({
  "Pelotão": yup.string().required('Campo obrigatório'),
  "Nome Completo": yup.string().required('Campo obrigatório'),
  "Matrícula": yup.string().required('Campo obrigatório'),
  "Graduação": yup.string().required('Campo obrigatório'),
});

