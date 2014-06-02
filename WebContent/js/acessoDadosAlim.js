/**
 * Obtem os dados de alimentacao existentes no local storage do
 * cliente.
 * 
 * @returns {Array} contendo instancias de DadoAlimentacao
 */
function obterDadosAlimentacao() {
	// checar se existe webstorage no browser... em algum ponto do c�digo

	var dadosBaseAlimentacao = localStorage.getItem("dadosBaseAlimentacao");
	var dadosAlimentacao = [];

	if (dadosBaseAlimentacao) {
		dadosBaseAlimentacao = JSON.parse(dadosBaseAlimentacao);
	}
	else{
		dadosBaseAlimentacao = gerarDadosAlimentacao();
	}

	dadosAlimentacao = complementarComDadosConsumo(dadosBaseAlimentacao, new Date());
	return dadosAlimentacao;
}

/**
 * Para cada objeto no array de dados base de alimentacao cria uma
 * instancia de DadoAlimentacao, complementa essa instancia com as informacoes
 * de alimentacao consumida que existirem no local storage para a data passada
 * como argumento e utiliza essa instancia para montar o array de DadoAlimentacao
 * que sera retornado.
 *   
 * @param dadosBaseAlimentacao array de objetos contendo as informacoes de base de alimentacao
 * @param data de referencia para buscar informacoes no localstorage
 * @returns {Array} de DadoAlimentacao com informacoes de alimentacoes recomendadas e consumidas 
 */
function complementarComDadosConsumo(dadosBaseAlimentacao, data) {
	var chaveDadoConsumo = "";
	var dadoConsumoArray;
	var dadoConsumoString = "";
	var dadosAlimentacao = [];
	var dadoRecriadoAlimentacao;

	for (var index in dadosBaseAlimentacao) {
		chaveDadoConsumo = montarChaveDadoConsumo(dadosBaseAlimentacao[index], data);
		dadoConsumoString = localStorage.getItem(chaveDadoConsumo);
		dadoRecriadoAlimentacao = new DadoAlimentacao(dadosBaseAlimentacao[index].id, dadosBaseAlimentacao[index].descricao, dadosBaseAlimentacao[index].consumoRecomendadoDia);

		if (dadoConsumoString) {
			dadoConsumoArray = JSON.parse(dadoConsumoString);
			dadoRecriadoAlimentacao["consumo" + data.toLocaleDateString()] = dadoConsumoArray;
		}
		dadosAlimentacao.push(dadoRecriadoAlimentacao);
	}
	return dadosAlimentacao;
}

/**
 * Utiliza o id do dado base de alimentacao e a data atual para construir
 * uma chave valida de dado consumo
 * 
 * @param dadoBaseAlimentacao dado de alimentacao contendo o id do grupo alimentar a ser utilizado na montagem da chave
 * @param data data de referencia para montagem da chave
 * @returns {String} chave no formato "item[idDadoAlimentacao]consumo[data]
 */
function montarChaveDadoConsumo(dadoBaseAlimentacao, data) {
	var chaveDadoConsumo = "item" + dadoBaseAlimentacao.id + "consumo"
			+ data.toLocaleDateString();
	return chaveDadoConsumo;
}

function gravarNovoConsumo(dadoAlimentacao, itemConsumo){
	var chaveDadoConsumo = montarChaveDadoConsumo(dadoAlimentacao, new Date());
	var arrayItensConsumo = localStorage.getItem(chaveDadoConsumo);
	if(arrayItensConsumo){
		arrayItensConsumo = JSON.parse(arrayItensConsumo);
	}
	else{
		arrayItensConsumo = [];
	}
	arrayItensConsumo.push(itemConsumo);
	localStorage.setItem(chaveDadoConsumo, JSON.stringify(arrayItensConsumo));
}


function gerarDadosAlimentacao() {
	var dadoAlimentacao1 = new DadoAlimentacao(1,
			"Cereais, tub�rculos, ra�zes e derivados", 6);
/*	dadoAlimentacao1["consumo26/5/2014"] = [
			new ItemConsumoDia(new Date(2014, 4, 26, 12, 0, 0, 0), 2),
			new ItemConsumoDia(new Date(2014, 4, 26, 18, 0, 0, 0), 3) ];
*/
	var dadoAlimentacao2 = new DadoAlimentacao(2, "Feij�es", 1);
/*	dadoAlimentacao2["consumo26/5/2014"] = [ new ItemConsumoDia(new Date(2014,
			4, 26, 13, 0, 0, 0), 1) ];
*/
	var dadoAlimentacao3 = new DadoAlimentacao(3,
			"Frutas e sucos de frutas naturais", 3);
/*	dadoAlimentacao3["consumo26/5/2014"] = [
			new ItemConsumoDia(new Date(2014, 4, 26, 13, 0, 0, 0), 1),
			new ItemConsumoDia(new Date(2014, 4, 26, 17, 0, 0, 0), 3) ];
*/
	var dadoAlimentacao4 = new DadoAlimentacao(4, "Legumes e verduras", 3);
/*	dadoAlimentacao4["consumo26/5/2014"] = [
			new ItemConsumoDia(new Date(2014, 4, 26, 12, 0, 0, 0), 1),
			new ItemConsumoDia(new Date(2014, 4, 26, 18, 0, 0, 0), 1) ];
*/
	var dadoAlimentacao5 = new DadoAlimentacao(5, "Leite e derivados", 3);
/*	dadoAlimentacao5["consumo26/5/2014"] = [
			new ItemConsumoDia(new Date(2014, 4, 26, 12, 0, 0, 0), 2),
			new ItemConsumoDia(new Date(2014, 4, 26, 18, 0, 0, 0), 1) ];
*/
	var dadoAlimentacao6 = new DadoAlimentacao(6, "Carnes e ovos", 1);
/*	dadoAlimentacao6["consumo26/5/2014"] = [ new ItemConsumoDia(new Date(2014,
			4, 26, 13, 0, 0, 0), 2) ];
*/
	var dadoAlimentacao7 = new DadoAlimentacao(7,
			"�leos, gorduras e sementes oleaginosas", 1);
/*	dadoAlimentacao7["consumo26/5/2014"] = [ new ItemConsumoDia(new Date(2014,
			4, 26, 12, 0, 0, 0), 1) ];
*/
	var dadoAlimentacao8 = new DadoAlimentacao(8, "A�ucares e doces", 1);
/*	dadoAlimentacao8["consumo26/5/2014"] = [ new ItemConsumoDia(new Date(2014,
			4, 26, 12, 0, 0, 0), 0) ];
*/
	var dadosAlimentacao = [ dadoAlimentacao1, dadoAlimentacao2,
			dadoAlimentacao3, dadoAlimentacao4, dadoAlimentacao5,
			dadoAlimentacao6, dadoAlimentacao7, dadoAlimentacao8 ];

	localStorage.setItem("dadosBaseAlimentacao", JSON.stringify(dadosAlimentacao));

	return dadosAlimentacao;
}