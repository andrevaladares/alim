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
		var consumoDoDia = this["consumo" + data];
		var consumoCalculadoDia;
		if(consumoDoDia){
			consumoCalculadoDia = consumoDoDia.length; 
		}
		else{
			consumoCalculadoDia = 0;
		}
		return consumoCalculadoDia;
	};
	
   /**
    * Metodo que adiciona um novo consumo ao objeto
    * {DadoAlimentacao} para a data passada como argumento.
    * Esse metodo complementa o atributo consumo[data] no objeto DadoAlimentacao
    * ou cria um novo atributo em tempo de execucao caso ainda nao exista.
    * O atributo consumo[data] e um array com as data/hora em os consumos foram realizados.
    * 
    * @param dataConsumo a data/hora (objeto {Date}) em que o consumo do alimento esta sendo adicionado 
    */
	this.novoConsumo = function(dataConsumo){
		var chaveCampoConsumo = "consumo"+dataConsumo.toLocaleDateString();
		if(!this.hasOwnProperty(chaveCampoConsumo)){
			this[chaveCampoConsumo]=[];
		}
		this[chaveCampoConsumo].push(dataConsumo);
	};
}
