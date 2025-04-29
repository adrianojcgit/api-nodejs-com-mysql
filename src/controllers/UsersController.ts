//importar a biblioteca Express
import express, { Request, Response } from "express";
//Importar a conexão com o BD
import { AppDataSource } from "../data-source";
//Importar a entidade User
import { User } from "../entity/User";
//Criar a aplicação Express
const router = express.Router();

//Criar a rota para visualizar detalhes do usuário
router.get("/users/:id", async (req: Request, res: Response) =>{
    try {
        //Obter o id do usuário a partir dos parâmetros da requisição
        const { id } = req.params;
        //Obter o repositório da entidade User
        const userRepository = AppDataSource.getRepository(User);
        //Buscar o usuário no banco de dados pelo ID
        const user = await userRepository.findOneBy({ id: parseInt(id) });
        //Verificar se o usuário foi encontrado
        if(!user){
            res.status(404).json({
                message: "Usuário não encontrado!!"
            });
            return;
        }
        //Retorna o usuário encontrado
        res.status(200).json({
            user: user
        });
        return;

    } catch (error) {
        res.status(500).json({
            message: "Erro ao visualizar o usuário!"
        });
        return;
    }
});

//Criar a rota listar usuários
router.get("/users", async (req: Request, res: Response) => {
    try {
        //Criar uma instância do repositório
        const userRepository = AppDataSource.getRepository(User);
        //Recupera todos os usuários do Banco de dados
        const users = await userRepository.find();
        //Retornar os usuários como resposta
        res.status(200).json(users);
        return;
    } catch (error) {
        res.status(500).json({
            message: "Erro ao listar os usuários!"
        });
        return;
    }
});

//Criar a rota cadastrar usuário
router.post("/users", async (req: Request, res: Response) => {
    try{
        //Receber os dados enviados no corpo da requisição
        var data = req.body;
        //Criar uma instância do repositório user
        const userRepository = AppDataSource.getRepository(User);
        //Recuperar o registro do banco de dados com o valor da coluna email
        const existingUser = await userRepository.findOne({ where: {email: data.email}});
        //Verficar se já existe usuário cadastrado com esse e-mail
        if(existingUser){
            res.status(400).json({
                message: "Já existe um usuário cadastrado com esse email!"
            });
        }
        //Criar um novo registro
        const newUser = userRepository.create(data);
        //Salvar o registro no banco de dados
        await userRepository.save(newUser);
        
        res.status(201).json({
            message: "Usuário cadastrado com  sucesso!",
            user: newUser,
        });
    }catch(error){
        res.status(500).json({
            message: "Erro ao cadastrar usuário!" + error,
        });
    }
    res.send("Cadastrar");
});

//Exportar a instrução que está dentro da constante router
export default router;