import {
  describe, expect, it, jest,
} from '@jest/globals';
import Autor from '../../models/autor.js';

describe('Testando o modelo Autor', () => {
  const objetoAutor = {
    nome: 'Thiago',
    nacionalidade: 'brasileiro',
    created_at: '2020-01-02',
    updated_at: '2020-01-02',
  };

  it('Deve instanciar uma nova editora', () => {
    const autor = new Autor(objetoAutor);

    expect(autor).toEqual(
      expect.objectContaining(objetoAutor),
    );
  });

  it.skip('Deve salvar autor no BD', () => {
    const autor = new Autor(objetoAutor);

    autor.salvar().then((dados) => {
      expect(dados.nacionalidade).toBe('brasileiro');
    });
  });

  it.skip('Deve salvar autor no BD usando a sintaxe moderna', async () => {
    const autor = new Autor(objetoAutor);

    const dados = await autor.salvar();

    const retornado = await Autor.pegarPeloId(dados.id);

    expect(retornado).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoAutor,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });

  it('Deve fazer uma chamada simulada ao BD', () => {
    const autor = new Autor(objetoAutor);

    autor.salvar = jest.fn().mockReturnValue({
      id: 1,
      nome: 'Thiago',
      nacionalidade: 'brasileiro',
      created_at: '2020-01-02',
      updated_at: '2020-01-02',
    });

    const retorno = autor.salvar();

    expect(retorno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        ...objetoAutor,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      }),
    );
  });
});
