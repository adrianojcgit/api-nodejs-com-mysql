//importar a biblioteca Express
import express, { Request, Response } from "express";
//Importar a conexão com o BD
import { AppDataSource } from "../data-source";
//Importar a entidade User
import { User } from "../entity/User";
//Criar a aplicação Express
const router = express.Router();
//Criar a rota cadastrar usuário
router.post("/users", async (req: Request, res: Response) => {
    try{
        var data = req.body;
        console.log(data);
        res.status(201).json({
            message: "Usuário cadastrado com  sucesso!",
            user: data
        });
    }catch(error){

    }
    res.send("Cadastrar");
});
//Exportar a instrução que está dentro da constante router
export default router;