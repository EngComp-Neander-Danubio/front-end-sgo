import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Ficha } from '../pages/views/ficha';
import { Login } from '../pages/views/login/Login';
import { HomePrincipal } from '../pages/views/home';
import { PostoServico } from '../pages/views/cadastrarPostoDeServico/PostoServico';
import { PageAddGrandeEvento } from '../pages/views/pageAddGrandeEvento/PageAddGrandeEvento';

export const Rotas = () => {
  // const { onOpen, onClose } = useDisclosure();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePrincipal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ficha" element={<Ficha />} />
        <Route path="/servico" element={<PostoServico />} />
        <Route path="/addEvento" element={<PageAddGrandeEvento />} />
        <Route path="/novoRegistro" element={<Ficha />} />
      </Routes>
    </Router>
  );
};