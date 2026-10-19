const inquirer = require('inquirer')

const fs = require('fs');
 function menuprincipal(){ 
inquirer.prompt([
     {
      type:'list',
      name:'escolha',
      message:'O que você gostaria de fazer?',
      choices:[
         'adicionar item a lista',
         'remover item da lista',
         'visualisar sua lista',
         'sair'
      ]
     }
    
])
.then( (answers) => {
   switch(answers.escolha){
   case ('adicionar item a lista'):
     const respostadousuario=  inquirer.prompt([
         {
            type:'input',
            name:'salvo',
            message:'Qual item você gostaria de adicionar?',
         }
      ]).then((respostadousuario) => { 
         
        
         fs.appendFile('arquivo.txt', respostadousuario.salvo + '\n', 'utf-8', (erro) => {
             if(erro){
                console.log("Ocorreu um erro ao adicionar um item");
             } else{
                console.log("Item adicionado com sucesso");
             }

              

         });
       
      });
       menuprincipal();  
      break;

     case ('visualisar sua lista'):
      const leitura = fs.readFileSync('arquivo.txt', 'utf-8')
          
          console.log(leitura);
       menuprincipal();
      break;

      case ('remover item da lista'):
          const dlt = fs.readFileSync('arquivo.txt', 'utf-8');
          const tst = dlt.split('\n')
          inquirer.prompt([
            {
               type:'list',
               name:'msg',
               message:'Qual item você quer remover?',
               choices:tst

            }
          ]).then((answers) => {
            if(answers.msg){ 
              const novalista = tst.filter(item => item !== answers.msg);

              fs.writeFileSync('arquivo.txt', novalista.join('\n'));
              console.log("item removido com sucesso");
              }else{
               console.log('nenhum item encontrado');
              }
              menuprincipal();
          });
          
             break;

         case('sair'):
          console.log('Programa encerrado, até logo!');
           break;











   }
        
   
   }
   
   
   
)
 }   
 
 menuprincipal();
    