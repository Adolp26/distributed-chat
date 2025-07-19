const io = require('socket.io-client');
const readline = require('readline');
const os = require('os');

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';

const socket = io(SERVER_URL);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const clientName = process.env.CLIENT_NAME || `User-${Math.floor(Math.random() * 1000)}`;
const machineName = os.hostname();

console.log(`Conectando ao servidor: ${SERVER_URL}`);
console.log(`Cliente: ${clientName} em ${machineName}`);

socket.on('connect', () => {
  console.log('Conectado ao servidor!');
  
  // Registra o cliente
  socket.emit('register', {
    name: clientName,
    machine: machineName
  });
  
  console.log('\nDigite suas mensagens (ou "exit" para sair):');
  promptMessage();
});

socket.on('new-message', (message) => {
  // Não mostra a própria mensagem novamente
  if (message.sender !== clientName) {
    console.log(`\n[${message.sender}@${message.machine}]: ${message.text}`);
    promptMessage();
  }
});

socket.on('clients-update', (clients) => {
  console.log(`\nClientes conectados: ${clients.length}`);
  clients.forEach(client => {
    console.log(`  - ${client.name} @ ${client.machine}`);
  });
  promptMessage();
});

socket.on('message-history', (messages) => {
  if (messages.length > 0) {
    console.log('\n--- Histórico de Mensagens ---');
    messages.slice(-10).forEach(msg => {
      console.log(`[${msg.sender}@${msg.machine}]: ${msg.text}`);
    });
    console.log('--- Fim do Histórico ---\n');
  }
});

socket.on('disconnect', () => {
  console.log('Desconectado do servidor!');
  process.exit(0);
});

function promptMessage() {
  rl.question('> ', (input) => {
    if (input.toLowerCase() === 'exit') {
      console.log('Saindo...');
      process.exit(0);
    }
    
    if (input.trim()) {
      socket.emit('message', {
        text: input,
        sender: clientName,
        machine: machineName
      });
    }
    
    promptMessage();
  });
}