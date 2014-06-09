var calculator=(function(){
  function calculate(text){
    var pattern=/\d+|\+|\-|\*|\/|\(|\)/g;
    var tokens=text.match(pattern);
    try{
      val=evaluation(tokens);
      if(tokens.length>0) throw "ill-formed expression";
      return String(val)
    }catch(err){
      return err;
    }
    return JSON.stringify(tokens);
//  var txt=$('#text');
//  var val=txt.val();
//  $('#text_out').text(val); //# indicates id, .text() is literal
//  //console.log(val);
  }
  function setup(div){
    var input=$('<input></input>',{type: 'text', size: 50});
    var output=$('<div></div>');
    var button=$('<button>Calculate</button>');
    $(div).append(input,button,output);
    button.on('click',function(event){
      output.text(calculate(input.val()));
    });
  }
  return {
    calculate: calculate, // or "calculate": calculate
    setup: setup
  };
})()

$(document).ready(function(){
  $('.calc').each(function(){
    calculator.setup(this);
  });
});

function read_operand(tokens){
  var numStr=tokens.shift();
  var num=parseInt(numStr);
  if(isNaN(num)) throw "number expected";
  return num;
}

function evaluation(tokens){
  if(tokens.length==0) throw "missing operand";
  var value=read_operand(tokens);
  while(tokens.length>0){
    var operator=tokens.shift();
    if(["+","-","*","/","(",")"].indexOf(operator)<0) throw "unrecognized operator";
    if(tokens.length==0) throw "missing operand";
    var next=read_operand(tokens);
    if(operator=="+"){
      value+=next;
    }else if(operator=="-"){
      value-=next;
    }else if(operator=="*"){
      value*=next;
    }else if(operator=="/"){
      value/=next;
    }
  }
  return value;
}
