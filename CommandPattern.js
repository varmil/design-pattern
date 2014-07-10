/*
   http://www.techscore.com/tech/DesignPattern/Command.html/
   第22章ではCommandパターンを学びます。あるオブジェクトに対して要求を送るということは、そのオブジェクトのメソッドを呼び出すことと同じです。 
   そして、メソッドにどのような引数を渡すか、ということによって要求の内容は表現されます。さまざまな要求を送ろうとすると、
   引数の数や種類を増やさなければなりませんが、 それには限界があります。そこで要求自体をオブジェクトにしてしまい、
   そのオブジェクトを引数に渡すようにします。それがCommandパターンです。
   Commandパターンは、要求をCommandオブジェクトにして、それらを複数組み合わせて使えるようにするパターンです。
*/


// 別解参考：クラス定義の方法
// var Command = function (){
	// this.hoge = "foo";
	// this.hobbies = [];
// }
// Command.prototype = {
	// SetBeaker: function(beaker){this.beaker = beaker;},
	// execute  : function(){}
// };


var Command = (function(){
	'use strict';

	// constructor必須（prototypeのため）
	function Command(){}

	Command.prototype.SetBeaker = function(beaker){
		this.beaker = beaker;
	};

	// InterFace
	Command.prototype.execute = function(){};
	
	return Command; // 即時関数の返り値となる
})();

var AddSaltCommand = (function(){
	'use strict';
	
	function AddSaltCommand(){}
	
	// Inherit Command
	AddSaltCommand.prototype = new Command();
	AddSaltCommand.prototype.execute = function(){
		while(this.beaker.IsMelted()){
			this.beaker.AddSalt(1);
			this.beaker.mix();
		}
		
		this.beaker.note();
	};
	
	return AddSaltCommand;
})();

var MakeSaltWaterCommand = (function(){
	'use strict';
	
	function MakeSaltWaterCommand(){}
	
	// Inherit Command
	MakeSaltWaterCommand.prototype = new Command();
	MakeSaltWaterCommand.prototype.execute = function(){
		this.beaker.mix();
		this.beaker.note();
	};

	return MakeSaltWaterCommand;
})();

var Beaker = (function () {
	'use strict';

	// Constructor
	function Beaker(water, salt) {
		this.melted = true;
		this.salt   = salt || 0;
		this.water  = water || 0;
		this.mix();
	}

	Beaker.CONST = {
		max_thickness : 26.4
	};

	Beaker.prototype.AddSalt = function(amount){
		this.salt += amount;
	};

	Beaker.prototype.AddWater = function(amount){
		this.water += amount;
	};

	Beaker.prototype.mix = function(){
		if (this.salt / (this.salt+this.water)*100 < Beaker.CONST.max_thickness){
			this.melted = true;
		} else {
			this.melted = false;
		}
	};
	
	Beaker.prototype.IsMelted = function(){
		return this.melted;
	};

	Beaker.prototype.note = function(){
		console.log("水：" + this.water + " g");
		console.log("食塩：" + this.salt + " g");
		console.log("濃度：" + (this.salt / (this.water+this.salt))*100 + " %");
	};

	return Beaker;
})();

var Student = (function(){
	'use strict';

	// Why "aaa" is printed after note() ???
	function Student(){console.log("aaa");}

	var add_salt = new AddSaltCommand();
	add_salt.SetBeaker(new Beaker(90, 10));
	add_salt.execute();
	
	return Student;
})();


// Run
new Student();