import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { BotaoCadastrar } from '../../componentsCadastro/botaoCadastrar';

interface IPostoServico {
  id: string;
  name: string;
  matricula: string;
  posto: string;
  opm: string;
}
export const FormPostoServico = () => {
  const toast = useToast();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IPostoServico>({
    defaultValues: {
      id: '',
      name: '',
      matricula: '',
      posto: '',
      opm: '',
    },
  });

  const onSubmit = async (data: IPostoServico) => {
    // const { matricula, id, name, posto } = data;
    try {
      //setIsLoading(true);
      toast({
        title: 'Sucesso!',
        description: 'Login realizado com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      reset(); // Reset the form after successful submission
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      // console.error("error:", error);
      toast({
        title: 'Erro ao fazer login.',
        description: error.response
          ? error.response.data.message
          : 'Verifique suas credenciais e tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    } finally {
      //setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDirection={'row'}  w={'1500px'} gap={8} border={'1px solid red'} p={2}>
        <Flex flexDirection={'column'} w={'100%'}>
          <FormLabel>Nome</FormLabel>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                aria-invalid={errors.name ? 'true' : 'false'}
                placeholder="Informe sua matrícula"
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} w={'100%'}>
          <FormLabel>Matrícula</FormLabel>
          <Controller
            name="matricula"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                aria-invalid={errors.matricula ? 'true' : 'false'}
                placeholder="Informe sua matrícula"
              />
            )}
          />
        </Flex>
        <Flex flexDirection={'column'} w={'100%'}>
          <FormLabel>OPM</FormLabel>
          <Controller
            name="opm"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                aria-invalid={errors.posto ? 'true' : 'false'}
                placeholder="Informe sua matrícula"
              />
            )}
          />
        </Flex>
      </Flex>
      <BotaoCadastrar label="Salvar" handleSubmit={handleSubmit(onSubmit)} />
    </form>
  );
};
