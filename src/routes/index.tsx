import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Ficha } from '../pages/views/ficha';
import { Login } from '../pages/views/login/Login';
import { PageAddGrandeEvento } from '../pages/views/page-Add-Grande-Evento/PageAddGrandeEvento';
import { PostoServico } from '../pages/views/page-cadastrar-posto-de-servico/PostoServico';
import { EditarPostoServico } from '../pages/views/page-editar-posto-de-Servico/EditarPostoServico';
import { HomePrincipal } from '../pages/views/page-home';
import { ListEvent } from '../pages/views/page-listar-eventos/ListEvent';
import { LoginSGO } from '../pages/views/page-login-sgo/LoginSGO';
import { SolicitacaoPMs } from '../pages/views/page-solicitacoes-pms';
import { SolicitacaoPostos } from '../pages/views/page-solicitacoes-postos';
import { ViewSolicitacaoPMs } from '../pages/views/page-viewSolicitacao-pms';
import { ViewSolicitacaoPostos } from '../pages/views/page-viewSolicitacao-postos';
import { ProtectedRoute } from '../protected-routes/protectedRoutes';

export const Rotas = () => {
  // const { onOpen, onClose } = useDisclosure();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePrincipal />} />

        <Route
          path="/solicitacao-posto-id/*"
          element={<ViewSolicitacaoPostos />}
        />
        <Route
          path="/solicitacao-pms-id/*"
          element={<ViewSolicitacaoPMs />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/login-sgo" element={<LoginSGO />} />
        <Route path="/ficha" element={<Ficha />} />
        <Route path="/criar-operacao" element={<PostoServico />} />
        <Route path={`/criar-operacao/*`} element={<EditarPostoServico />} />
        <Route path="/listar-operacoes" element={<ListEvent />} />
        <Route path="/adicionar-operacao" element={<PageAddGrandeEvento />} />
        <Route path="/novoRegistro" element={<Ficha />} />
        <Route
          path="/listar-solicitacoes-postos"
          element={<SolicitacaoPostos />}
        />
        <Route path="/listar-solicitacoes-pms" element={<SolicitacaoPMs />} />
        {/* <ProtectedRoute allowedRoles={['admin']}>
          <></>
        </ProtectedRoute> */}
      </Routes>
    </Router>
  );
};
