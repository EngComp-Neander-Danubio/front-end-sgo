import {
  FormControl,
  FormErrorMessage,
  Input,
  InputProps,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface IInput extends InputProps {
  error?: FieldError | { message?: string };
}
export const InputPatternController: React.FC<IInput> = ({
  error,
  ...props
}) => {
  return (
    <>
      <FormControl isInvalid={!!error}>
        <Input type={props.type} placeholder={props.placeholder} {...props} />
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      </FormControl>
    </>
  );
};
