/**
 * Classe que representa um dado de alimentacao.
 * Alem dos atributos informados no construtor outros atributos sao adicionados
 * em tempo de execucao para associar os consumos de alimentacao realizados para
 * cada dado de alimentacao.
 * 
 * @param id string a ser utilizada como id do dado de alimentacao
 * @param descricao string descrevendo o grupo alimentar representado por um determinado dado de alimentacao
 * @param consumoRecomendadoDia integer representando a quantidade recomendada de porcoes para o grupo alimentar
 * @returns uma instancia de {DadoAlimentacao}
 */
function DadoAlimentacao(id, descricao, consumoRecomendadoDia) {
	this.id = id;
	this.descricao = descricao;
	this.consumoRecomendadoDia = consumoRecomendadoDia;
	
	this.calcularConsumoDia = function (data){
		var totalConsumido = 0;
		var consumoDoDia = this["consumo" + data.toLocaleDateString()];
		for(var index in consumoDoDia){
			totalConsumido += consumoDoDia[index].porcaoConsumida;
		}
		
		return totalConsumido;
	};
	
   /**
    * Metodo que adiciona um novo consumo ao objeto
    * {DadoAlimentacao} com base na instancia de {ItemConsumoDia} passada
    * como argumento.
    * Esse metodo complementa o atributo consumo[data] no objeto DadoAlimentacao
    * ou cria um novo atributo em tempo de execucao caso ja nao exista.
    * O atributo consumo[data] e um array de {ItemConsumo}.
    */
	this.novoConsumo = function(itemConsumo){
		var chaveCampoConsumo = "consumo"+itemConsumo.dataConsumo.toLocaleDateString();
		if(!this.hasOwnProperty(chaveCampoConsumo)){
			this[chaveCampoConsumo]=[];
		}
		this[chaveCampoConsumo].push(itemConsumo);
	};
}


/**
 * Classe que representa um item de alimentacao consumido em um
 * determinado dia.
 * 
 * @param dataConsumo data em que o item foi consumido
 * @param porcaoConsumida integer representando a quantidade de porcoes consumida
 * @returns uma instancia de {ItemConsumoDia}
 */
function ItemConsumoDia(dataConsumo, porcaoConsumida) {
	this.dataConsumo = dataConsumo;
	this.porcaoConsumida = porcaoConsumida;
}
