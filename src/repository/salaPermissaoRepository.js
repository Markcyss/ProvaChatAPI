import { connection } from './connection.js';


export async function inserirPermissao(salaId, usuarioId, aprovado) {
    const comando = `
        insert into salaPermissao (sala_id, usuario_id, aprovado)
            values (?, ?, ?);
    `
    const [registros] = await connection.query(comando, [salaId, usuarioId, aprovado]);
    return registros;
}


export async function aprovarPermissao(salaId, usuarioId) {
    const comando = `
        update salaPermissao
            set aprovado = true
            where sala_id = ? and usuario_id = ?;
    `

    const [info] = await connection.query(comando, [salaId, usuarioId]);
    return info;
}


export async function verificarPermissaoSala(salaId, usuarioId) {
    const comando = `
        select *
            from salaPermissao
            where sala_id = ? and usuario_id = ? and aprovado = true;
    `;

    const [info] = await connection.query(comando, [salaId, usuarioId]);
    return info[0];
}