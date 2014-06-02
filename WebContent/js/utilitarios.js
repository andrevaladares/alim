/**
 * Cria um elemento html com conteudo expresso atraves da propriedade innerHTML
 * 
 * @param tipo
 *            string informando tipo do elemento a ser criado (ex.: "span")
 * @param id
 *            string informando o valor do atributo html id a ser aplicado para
 *            o elemento criado
 * @param conteudo
 *            string com a informacao a ser adicionada a propriedade innerHTML
 *            do elemento
 * @param classe
 *            string opcional informando a classe css a ser aplicada ao novo
 *            elemento
 * @returns Objeto com a referencia para o elemento html criado
 */
function criarElemento(tipo, id, conteudo, classe) {
	var elemento = document.createElement(tipo);
	elemento.setAttribute("id", id);
	elemento.innerHTML = conteudo;

	if (classe) {
		elemento.className = classe;
	}

	return elemento;
}