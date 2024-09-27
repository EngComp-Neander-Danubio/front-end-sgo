import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Ficha } from '../pages/views/ficha';
import { Login } from '../pages/views/login/Login';
import { HomePrincipal } from '../pages/views/home';
import { PostoServico } from '../pages/views/cadastrarPostoDeServico/PostoServico';
import { PageAddGrandeEvento } from '../pages/views/pageAddGrandeEvento/PageAddGrandeEvento';
import { ListEvent } from '../pages/views/listar-eventos/ListEvent';
import { EditarPostoServico } from '../pages/views/editarPostoDeServico/EditarPostoServico';
import { SolicitacaoPostos } from '../pages/views/solicitacoes-postos';
import { SolicitacaoPMs } from '../pages/views/solicitacoes-pms';
import { ViewSolicitacaoPostos } from '../pages/views/viewSolicitacaoPostos';
import { ViewSolicitacaoPMs } from '../pages/views/viewSolicitacaoPMs';

export const Rotas = () => {
  // const { onOpen, onClose } = useDisclosure();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePrincipal />} />
        <Route
          path="/viewSolicitacaoPostos"
          element={<ViewSolicitacaoPostos />}
        />
        <Route path="/viewSolicitacaoPMs" element={<ViewSolicitacaoPMs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ficha" element={<Ficha />} />
        <Route path="/servico" element={<PostoServico />} />
        <Route path={`/servico/*`} element={<EditarPostoServico />} />
        <Route path="/lista-de-eventos" element={<ListEvent />} />
        <Route path="/addEvento" element={<PageAddGrandeEvento />} />
        <Route path="/novoRegistro" element={<Ficha />} />
        <Route path="/solicitacoes-postos" element={<SolicitacaoPostos />} />
        <Route path="/solicitacoes-pms" element={<SolicitacaoPMs />} />
      </Routes>
    </Router>
  );
};
