import {
  describe,
  it,
  expect,
  afterEach,
  beforeEach,
  jest,
} from '@jest/globals';
import request from 'supertest';
import app from '../../app.js';

let server;
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe.skip('GET em /autores', () => {
  it('Deve retornar uma lista de autores', async () => {
    const resposta = await request(app)
      .get('/autores')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].nacionalidade).toEqual('sul-africano');
  });
});

let idResposta;
describe('POST em /autores', () => {
  it('Deve adicionar um novo autor', async () => {
    const resposta = await request(app)
      .post('/autores')
      .send({
        nome: 'Thiago',
        nacionalidade: 'brasileiro',
        created_at: '2020-01-02',
        updated_at: '2020-01-02',
      })
      .expect(201);

    idResposta = resposta.body.content.id;
  });

  it('Não deve adicionar nada ao passar o body vazio', async () => {
    await request(app)
      .post('/autores')
      .send({})
      .expect(400);
  });
});

describe('GET em /autores/id', () => {
  it('Deve retornar o recurso selecionado', async () => {
    await request(app)
      .get(`/autores/${idResposta}`)
      .expect(200);
  });
});

describe('PUT em /autores/id', () => {
  it.each([
    ['nome', { nome: 'Thiago' }],
    ['nacionalidade', { nacionalidade: 'brasileiro' }],
  ])('Deve alterar o campo %s', async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app)
      .put(`/editoras/${idResposta}`)
      .send(param)
      .expect(204);

    expect(spy).toBeCalled();
  });
});

describe('DELETE em /autores/id', () => {
  it('Deletar o recurso selecionado', async () => {
    await request(app)
      .delete(`/editoras/${idResposta}`)
      .expect(200);
  });
});
