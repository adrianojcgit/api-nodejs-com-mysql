//Importart a biblioteca Express
import express, {Request, Response} from "express";		
//Importar arquivo com as credenciais do Banco
import { AppDataSource } from "./data-source";		
//Criar a aplicação Express
const app = express();
//inicializar a conexão com o Banco
AppDataSource.initialize()
.then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso!");
})
.catch((error) => console.log("Erro na conexão com o banco de dados: ", error));
//Criar a rota principal "Get"
    app.get("/", (req: Request, res: Response) => {
        res.send("Bem-vindo!");
    });			
//Iniciar o servidor na porta 8080
    app.listen(8080, () =>  console.log("Servidor iniciado na porta 8080: http://localhost:8080"));