import { connection } from './connection.js';


export async function inserirMensagem(usuarioId, salaId, mensagem) {
    const comando = `
        insert into chat (usuario_id, sala_id, mensagem, criacao) 
            values (?, ?, ?, now());
    `;

    const [registros] = await connection.query(comando, [usuarioId, salaId, mensagem]);
    return registros.insertId;
}


export async function listarMensagensPorSala(salaId) {
    const comando = `
        select 
                chat.id, 
                chat.usuario_id,
                nome,
                mensagem,
                criacao
            from chat
            join usuario on chat.usuario_id = usuario.id
            where sala_id = ?
            order by criacao asc;
    `

    const [registros] = await connection.query(comando, salaId);
    return registros;
}