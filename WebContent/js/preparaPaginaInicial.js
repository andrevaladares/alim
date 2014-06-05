window.onload = init;

function init() {
	document.getElementById("navegarAnterior").onclick = navegarDataAnterior;
	document.getElementById("navegarProximo").onclick = navegarProximaData;

	var dataAtualStr = new Date().toLocaleDateString();
	document.getElementById("dataAcompanhamento").innerHTML = dataAtualStr;
	montarTela(dataAtualStr);
}

function navegarDataAnterior(){
	var dataUltimaConsultaStr = document.getElementById("dataAcompanhamento").innerHTML;
	var dataAnteriorStr = oberDataAnteriorComDados(dataUltimaConsultaStr);
	document.getElementById("dataAcompanhamento").innerHTML = dataAnteriorStr;
	montarTela(dataAnteriorStr);
}

function navegarProximaData(){
	var dataUltimaConsultaStr = document.getElementById("dataAcompanhamento").innerHTML;
	var dataSeguinteStr = oberDataSeguinteComDados(dataUltimaConsultaStr);
	document.getElementById("dataAcompanhamento").innerHTML = dataSeguinteStr;
	montarTela(dataSeguinteStr);
}

function montarTela(data){
	var dadosAlimentacao = obterDadosAlimentacao(data);
	if (dadosAlimentacao.length > 0) {
		carregarTabelaAcompanhamentoAlimentar(dadosAlimentacao, data);
		calcularECarregarTotaisConsumoDia(dadosAlimentacao, data);
		montarFormularioAdicaoConsumo(dadosAlimentacao);
	}
}

/**
 * Carrega a tabela de acompanhamento alimentar na pagina inicial com os dados
 * para a data atual
 * 
 * @param dadosAlimentacao
 *            array contendo instancias de DadoAlimentacao
 */
function carregarTabelaAcompanhamentoAlimentar(dadosAlimentacao, dataStr) {
	var liItem;
	var spanItemDescricao;
	var spanItemRecomendacao;
	var spanItemConsumo;
	var spanAvaliacaoConsumoDia;
	var idDadosAlimentacao;
	var consumoCalculadoDia = 0;
	var avaliacaoConsumoDia = "";

	var tabela = document.getElementById("tabelaAcompanhamentoAlimentar");

	for (var index in dadosAlimentacao) {
		idDadosAlimentacao = dadosAlimentacao[index].id;

		spanItemDescricao = criarElemento("span", "itemDesc_" + idDadosAlimentacao, dadosAlimentacao[index].descricao, "descricao");
		spanItemRecomendacao = criarElemento("span", "itemRec_" + idDadosAlimentacao, dadosAlimentacao[index].consumoRecomendadoDia, "valor");
		consumoCalculadoDia = dadosAlimentacao[index].calcularConsumoDia(dataStr);
		spanItemConsumo = criarElemento("span", "itemCons_" + idDadosAlimentacao, consumoCalculadoDia, "valor");

		avaliacaoConsumoDia = avaliarConsumoDia(dadosAlimentacao[index].consumoRecomendadoDia, consumoCalculadoDia);
		
		spanAvaliacaoConsumoDia = criarElemento("span", "itemCons_" + idDadosAlimentacao, avaliacaoConsumoDia, "iconeAvaliacao " + avaliacaoConsumoDia);

		liItem = document.createElement("li");
		liItem.setAttribute("id", "item_" + dadosAlimentacao[index].id);
		liItem.appendChild(spanItemDescricao);
		liItem.appendChild(spanItemRecomendacao);
		liItem.appendChild(spanItemConsumo);
		liItem.appendChild(spanAvaliacaoConsumoDia);

		//todo melhorar?
		var liItemExistente = document.getElementById(liItem.id);
		if(liItemExistente){
			tabela.replaceChild(liItem, liItemExistente);
		}
		else{
			tabela.appendChild(liItem);
		}
	}
}

/**
 * Compara consumo recomendado e realizado e retorna ok (caso iguais), excesso (caso realizado ultrapasse recomendado) ou
 * Sobra (caso recomendado nao seja ultrapassado)
 * 
 * @param consumoRecomendadoDia integer com o consumo recomendado
 * @param consumoRealizadoDia integer com o consumo realizado
 * @returns {String} contendo o resultado da avaliacao
 */
function avaliarConsumoDia(consumoRecomendadoDia, consumoRealizadoDia) {
	var avaliacao = "ok";
	if (consumoRecomendadoDia > consumoRealizadoDia) {
		avaliacao = "sobra";
	} else if (consumoRecomendadoDia < consumoRealizadoDia) {
		avaliacao = "excesso";
	}
	return avaliacao;
}

/**
 * Calcula os totais dos valores recomendados e consumidos e complementa a
 * tabela na pagina inicial
 * 
 * @param dadosAlimentacao
 *            array contendo instancias de DadoAlimentacao
 */
function calcularECarregarTotaisConsumoDia(dadosAlimentacao, dataStr) {
	var totalRecomendacoes = 0;
	var totalConsumos = 0;
	var tabela = document.getElementById("tabelaAcompanhamentoAlimentar");

	for (var index in dadosAlimentacao) {
		totalRecomendacoes += dadosAlimentacao[index].consumoRecomendadoDia;
		totalConsumos += dadosAlimentacao[index].calcularConsumoDia(dataStr);
	}

	var spanDescTotal = criarElemento("span", "descTotal", "Totais", "descricao total");
	var spanTotalRecs = criarElemento("span", "totalRecs", totalRecomendacoes, "valor total");
	var spanTotalCons = criarElemento("span", "totalCons", totalConsumos, "valor total");
	var avaliacaoTotalDia = avaliarConsumoDia(totalRecomendacoes, totalConsumos);
	var spanAvaliacaoTotal = criarElemento("span", "avalTotal", avaliacaoTotalDia,"iconeAvaliacao total " + avaliacaoTotalDia);

	liTotal = document.createElement("li");
	liTotal.setAttribute("id", "itemTotal");
	liTotal.appendChild(spanDescTotal);
	liTotal.appendChild(spanTotalRecs);
	liTotal.appendChild(spanTotalCons);
	liTotal.appendChild(spanAvaliacaoTotal);

	var liTotalExistente = document.getElementById(liTotal.id);
	if(liTotalExistente){
		tabela.replaceChild(liTotal, liTotalExistente);
	}
	else{
		tabela.appendChild(liTotal);
	}
}

/**
 * Monta na tela inicial o formulario que permite adicionar novo consumo para a
 * data atual. Utiliza o parametro para montar a combo com os grupos alimentares
 * 
 * @param dadosAlimentacao
 *            array contendo instancias de DadoAlimentacao
 */
function montarFormularioAdicaoConsumo(dadosAlimentacao) {
	var select = document.getElementById("grupoAlimentar");
	var opt;
	for (var index in dadosAlimentacao) {
		opt = document.createElement("option");
		opt.value = dadosAlimentacao[index].id;
		opt.text = dadosAlimentacao[index].descricao;

		select.appendChild(opt);
	}

	document.getElementById("btnAdicionarConsumo").onclick = adicionarConsumo;
}

/**
 * Funcao que trata o evento de click no botal de adicionar um consumo. Adiciona
 * nova informacao de alimentacao consumida para a data atual, atualizando a
 * tabela e os totais e gravando a informacao no local storage do usuario
 */
function adicionarConsumo() {
	var idGrupoAlimentar = parseInt(document.getElementById("grupoAlimentar").value);
	var dataCadastro = new Date();
	var dadosAlimentacao = obterDadosAlimentacao(dataCadastro.toLocaleDateString());
	var itemConsumo;

	var porcaoConsumida = parseInt(document.getElementById("porcaoConsumida").value);

	if (porcaoConsumida) {
		for (var index in dadosAlimentacao) {
			if (dadosAlimentacao[index].id == idGrupoAlimentar) {
				itemConsumo = new ItemConsumoDia(dataCadastro, porcaoConsumida);
				dadosAlimentacao[index].novoConsumo(itemConsumo);
				gravarNovoConsumo(dadosAlimentacao[index], itemConsumo);
				break;
			}
		}
		carregarTabelaAcompanhamentoAlimentar(dadosAlimentacao);
		calcularECarregarTotaisConsumoDia(dadosAlimentacao);
	}
}
