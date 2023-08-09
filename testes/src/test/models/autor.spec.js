import { describe, expect, it } from '@jest/globals';
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
});
