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
    let msg = '';

    let check = await salaPermissaoRepo.verificarPermissaoSala(salaId, usuarioLogadoId);

    if (!check) {
        msg = 'Pedido Enviado';
        await salaPermissaoRepo.inserirPermissao(salaId, usuarioLogadoId, permissao);
    }
    else {
        msg = 'Você já possui permissão nesta sala';
    }
    resp.send({ msg });
});


endpoints.post('/sala/:sala/aprovar/:usuario', autenticador, async (req, resp) => {
    let salaId = req.params.sala;
    let usuarioLogadoId = req.user.id;
    let usuarioAprovar = req.params.usuario;
    let verPermissao = await salaPermissaoRepo.verificarPermissaoSala(salaId, usuarioAprovar);
    let salainfo = await salaRepo.buscarSalaPorId(salaId);
    let msg = '';



    if (usuarioLogadoId != salainfo.usuario_id){
        msg = 'Você não é o dono da sala';
        resp.status(403);
    }
    else if(!verPermissao || usuarioLogadoId == salainfo.usuario_id){
        await salaPermissaoRepo.aprovarPermissao(salaId, usuarioAprovar);
        msg = 'Permissão Concedida';
    }
    else {
        msg = 'Permissão já estava concedida';
    }

    resp.send({ msg });
});



export default endpoints;