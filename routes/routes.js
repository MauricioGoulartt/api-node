// Importa as bibliotecas necessárias e o modelo de usuário
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

// Cria um novo roteador express
const router = express.Router();

// Endpoint de registro
router.post("/signup", async (req, res) => {
  // Extrai os campos necessários do corpo da solicitação
  const { name, email, password, telephones } = req.body;

  // Verifica se todos os campos estão presentes
  if (!name || !email || !password || !telephones) {
    // Se algum campo estiver faltando, retorna um erro 400
    return res.status(400).json({ message: "All fields are required" });
  }

  // Gera um hash da senha usando bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria um novo usuário com os dados fornecidos
  const user = new User({
    name,
    email,
    password: hashedPassword,
    telephones,
  });

  try {
    // Tenta salvar o usuário no banco de dados
    const savedUser = await user.save();

    const { password, ...userWithoutPassword } = savedUser._doc;
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    // Se um erro ocorrer ao salvar o usuário...
    if (err.code === 11000) {
      // Se o erro for de duplicação de chave única (email já existe), retorna um erro 400
      return res.status(400).json({ message: "Email already exists" });
    } else {
      // Se for qualquer outro erro, retorna um erro 500
      return res.status(500).json({ message: err.message });
    }
  }
});

// Endpoint de login
router.post("/signin", async (req, res) => {
  try {
    // Extrai email e senha do corpo da solicitação
    const { email, password } = req.body;

    // Tenta encontrar um usuário com o email fornecido
    const user = await User.findOne({ email });

    // Se nenhum usuário for encontrado, retorna um erro 401
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compara a senha fornecida com a senha hashada do usuário
    const validPassword = bcrypt.compare(password, user.password);

    // Se a senha for inválida, retorna um erro 401
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Se a autenticação for bem-sucedida, gera um token JWT
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET);

    // Retorna o token
    res.status(200).json({ token });
  } catch (err) {
    // Se um erro ocorrer, retorna um erro 400
    res.status(400).json({ message: err.message });
  }
});

// Endpoint para obter informações do usuário
router.get("/user", async (req, res) => {
  try {
    // Extrai o token do cabeçalho de autorização
    const token = req.headers.authorization.split(" ")[1];

    // Verifica o token e extrai os dados do usuário
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;
    console.log(id)

    // Busca o usuário no banco de dados
    const user = await User.findById(id);

    // Retorna as informações do usuário
    res.status(200).json({
      email: user.email,
      id: user._id,
      telephones: user.telephones,
      created_at: user.created_at,
      modified_at: user.modified_at,
    });
  } catch (err) {
    // Se um erro ocorrer (por exemplo, o token é inválido), retorna um erro 401
    res.status(401).json({ message: "Invalid token" });
  }
});

// Endpoint de atualização
router.put("/user/me", async (req, res) => {
  // Implementar a atualização do usuário aqui
});

// Endpoint de exclusão
router.delete("/user/me", async (req, res) => {
  // Implementar a exclusão do usuário aqui
});

// Endpoint para obter informações do usuário
router.get("/user/me", async (req, res) => {
  // ...same as before
});

// Exporta o roteador para ser usado em outro lugar
export default router;
