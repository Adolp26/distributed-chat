# 💬 Sistema de Chat Distribuído

Um sistema de chat em tempo real que demonstra conceitos fundamentais de sistemas distribuídos usando Node.js e Socket.IO. Permite comunicação entre múltiplas máquinas na mesma rede local.

![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## 📋 Pré-requisitos

- **Node.js** v14 ou superior ([Download](https://nodejs.org/))
- **NPM** (vem com o Node.js)
- **Docker** (opcional, para execução com containers)
- Duas ou mais máquinas na mesma rede local

## 🚀 Instalação Rápida

### 1. Clone ou baixe o projeto

```bash
# Crie a estrutura de pastas
mkdir distributed-chat
cd distributed-chat
mkdir server client
```

### 2. Crie os arquivos

Copie os arquivos fornecidos para suas respectivas pastas:
- `server/package.json`
- `server/server.js`
- `client/package.json`
- `client/client.js`

## 🖥️ Executando o Sistema

### Método 1: Em Uma Única Máquina (Teste Local)

#### 1. Inicie o servidor:
```bash
cd server
npm install
npm start
```

Você verá:
```
====================================
Servidor Chat Distribuído
====================================
Rodando em:
- Local: http://localhost:3000
- Rede: http://192.168.1.100:3000
====================================
```

#### 2. Em outro terminal, inicie um cliente:
```bash
cd client
npm install
npm start
```

#### 3. Abra mais terminais para mais clientes ou acesse pelo navegador:
```
http://localhost:3000
```

### Método 2: Em Máquinas Diferentes (Rede Local)

#### Na Máquina 1 (Servidor):

1. **Descubra o IP da máquina:**
   ```bash
   # Windows
   ipconfig
   
   # Linux/Mac
   ifconfig
   # ou
   ip addr
   ```
   Procure por algo como `192.168.1.XXX`

2. **Inicie o servidor:**
   ```bash
   cd server
   npm install
   npm start
   ```

3. **Anote o IP mostrado** (ex: `192.168.1.100`)

#### Na Máquina 2+ (Clientes):

1. **Instale as dependências:**
   ```bash
   cd client
   npm install
   ```

2. **Conecte ao servidor usando o IP:**
   
   **Windows (CMD):**
   ```cmd
   set SERVER_URL=http://192.168.1.100:3000 && npm start
   ```
   
   **Windows (PowerShell):**
   ```powershell
   $env:SERVER_URL="http://192.168.1.100:3000"; npm start
   ```
   
   **Linux/Mac:**
   ```bash
   SERVER_URL=http://192.168.1.100:3000 npm start
   ```

3. **Ou acesse pelo navegador:**
   ```
   http://192.168.1.100:3000
   ```

### Método 3: Usando Docker

#### 1. Com Docker Compose (mais fácil):

```bash
# Na raiz do projeto (onde está o docker-compose.yml)
docker-compose up --build
```

Para acessar os clientes CLI:
```bash
# Em terminais separados
docker attach distributed-chat-client1-1
docker attach distributed-chat-client2-1
```

#### 2. Containers individuais:

**Servidor:**
```bash
cd server
docker build -t chat-server .
docker run -p 3000:3000 chat-server
```

**Cliente:**
```bash
cd client
docker build -t chat-client .
docker run -it -e SERVER_URL=http://IP_DO_HOST:3000 chat-client
```

## 🎮 Como Usar

### Interface de Linha de Comando (CLI):

1. Digite sua mensagem e pressione `Enter` para enviar
2. Digite `exit` para sair
3. As mensagens aparecem em tempo real

### Interface Web:

1. Acesse `http://IP_DO_SERVIDOR:3000` no navegador
2. Digite mensagens na caixa de texto
3. Veja os clientes conectados no painel lateral
4. As mensagens são sincronizadas em tempo real

## 🔧 Configurações Avançadas

### Variáveis de Ambiente

#### Servidor:
```bash
PORT=3000  # Porta do servidor (padrão: 3000)
```

#### Cliente:
```bash
SERVER_URL=http://192.168.1.100:3000  # URL do servidor
CLIENT_NAME=João                       # Nome do cliente (padrão: User-XXX)
```

### Personalizar nome do cliente:
```bash
# Windows
set CLIENT_NAME=MeuNome && npm start

# Linux/Mac
CLIENT_NAME=MeuNome npm start
```

## 🚨 Solução de Problemas

### "Não consigo conectar ao servidor"

1. **Verifique se estão na mesma rede:**
   - Ambas máquinas devem estar no mesmo WiFi/rede
   - IPs devem ser similares (ex: 192.168.1.X)

2. **Verifique o firewall:**
   
   **Windows:**
   ```bash
   # Adicionar exceção para Node.js
   netsh advfirewall firewall add rule name="Node.js" dir=in action=allow program="C:\Program Files\nodejs\node.exe"
   ```
   
   **Linux:**
   ```bash
   # Abrir porta 3000
   sudo ufw allow 3000
   ```

3. **Teste a conectividade:**
   ```bash
   # Da máquina cliente, teste o ping
   ping 192.168.1.100
   ```

### "EADDRINUSE: Porta já em uso"

```bash
# Windows - encontrar e matar processo
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3000
kill -9 <PID>
```

### "npm install falha"

1. Limpe o cache:
   ```bash
   npm cache clean --force
   ```

2. Delete node_modules e package-lock.json:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## 📁 Estrutura do Projeto

```
distributed-chat/
│
├── server/                 # Servidor central
│   ├── package.json       # Dependências do servidor
│   ├── server.js          # Código do servidor
│   └── Dockerfile         # Container do servidor
│
├── client/                 # Cliente CLI
│   ├── package.json       # Dependências do cliente
│   ├── client.js          # Código do cliente
│   └── Dockerfile         # Container do cliente
│
├── docker-compose.yml     # Orquestração Docker
└── README.md             # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript
- **Socket.IO**: Comunicação em tempo real
- **Express**: Servidor web
- **Docker**: Containerização (opcional)
- **WebSockets**: Protocolo de comunicação bidirecional

## 📊 Características

- ✅ Comunicação em tempo real
- ✅ Múltiplos clientes simultâneos
- ✅ Interface CLI e Web
- ✅ Histórico de mensagens (últimas 100 mensagens)
- ✅ Lista de usuários online
- ✅ Reconexão automática
- ✅ Identificação de máquina/cliente

## 🔄 Próximos Passos (quando tiver mais)

1. **Persistência**: Adicionar banco de dados (MongoDB/Redis)
2. **Autenticação**: Sistema de login
3. **Salas**: Criar diferentes canais
4. **Arquivos**: Compartilhamento de arquivos
5. **Criptografia**: Mensagens criptografadas
6. **Escalabilidade**: Múltiplos servidores com load balancer

---

**Dica:** Para uma experiência completa, experimente rodar o servidor em um Raspberry Pi ou servidor dedicado na sua rede local!