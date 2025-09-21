import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import * as salaPermissaoRepo from '../repository/salaPermissaoRepository.js';
import * as chatRepo from '../repository/chatRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();


endpoints.post('/chat/:sala', autenticador, async (req, resp) => {
    let salaId = req.params.sala;
    let usuarioLogadoId = req.user.id;
    let mensagem = req.body.mensagem;
    let msg = '';
    let check = await salaPermissaoRepo.verificarPermissaoSala(salaId, usuarioLogadoId);

    if (!check) {
        msg = 'Você não tem permissão para mandar mensagens neste chat';
        resp.status(403);
    }
    else {
        id = await chatRepo.inserirMensagem(usuarioLogadoId, salaId, mensagem);
        msg = `Mensagem n°${id} enviada`;
    }
    resp.send({ msg });
});


endpoints.get('/chat/:sala', autenticador, async (req, resp) => {
    let salaId = req.params.sala;
    let usuarioLogadoId = req.user.id;
    let msg = '';

    let check = await salaPermissaoRepo.verificarPermissaoSala(salaId, usuarioLogadoId);

    if (!check) {
        msg = 'Você não tem permissão para acessar as mensagens deste chat';
        resp.status(403);
    }
    else {
        msg = await chatRepo.listarMensagensPorSala(salaId);
    }
    resp.send({ msg });
});


export default endpoints;