import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import * as salaPermissaoRepo from '../repository/salaPermissaoRepository.js';
import * as salaRepo from '../repository/salaRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();



endpoints.post('/sala/:sala/entrar', autenticador, async (req, resp) => {
    let salaId = req.params.sala;
    let usuarioLogadoId = req.user.id;
    let permissao = false;
    let msg = 'Pedido Enviado';

    await salaPermissaoRepo.inserirPermissao(salaId, usuarioLogadoId, permissao);
    resp.send({ msg });
});


endpoints.post('/sala/:sala/aprovar/:usuario', autenticador, async (req, resp) => {
    let salaId = req.params.sala;
    let usuarioLogadoId = req.user.id;
    let usuarioAprovar = req.params.usuario;
    let verPermissao = salaPermissaoRepo.verificarPermissaoSala(salaId, usuarioAprovar);
    let msg = '';

    if (!verPermissao){
        msg = 'Permissão já concedida';
    }
    else {
        await salaPermissaoRepo.aprovarPermissao(salaId, usuarioAprovar);
        msg = 'Permissão Concedida';
    }

    resp.send({ msg });
});



export default endpoints;