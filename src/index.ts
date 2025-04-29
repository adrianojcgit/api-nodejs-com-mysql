//Importart a biblioteca Express
import express, {Request, Response} from "express";				
//Criar a aplicação Express
const app = express();
//Criar o middleware para receber os dados no corpo da requisição
app.use(express.json());
//Importar a Controller
import UsersController from "./controllers/UsersController";
//Criar a rota
app.use('/', UsersController);
//Criar a rota principal "Get"
    app.get("/", (req: Request, res: Response) => {
        res.send("Bem-vindo!");
    });			
//Iniciar o servidor na porta 8080
    app.listen(8080, () =>  console.log("Servidor iniciado na porta 8080: http://localhost:8080"));