import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import * as salaRepo from '../repository/salaRepository.js';
import * as salaPermissaoRepo from '../repository/salaPermissaoRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();


endpoints.post('/sala', autenticador, async (req, resp) => {
    let nomeSala = req.body.nome;
    let usuarioLogadoId = req.user.id;
    let permissao = true;

    let id = await salaRepo.inserirSala(nomeSala, usuarioLogadoId);
    await salaPermissaoRepo.inserirPermissao(id, usuarioLogadoId, permissao);

    resp.send({ novoId: id });
});


export default endpoints;