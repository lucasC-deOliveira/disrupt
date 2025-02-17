# Usa uma imagem Node com suporte ao Electron
FROM node:18

# Instala dependências essenciais
RUN apt-get update && apt-get install -y \
    python3 \
    python3-distutils \
    build-essential \
    libdbus-1-3 \              
    libatk1.0-0 \              
    libgdk-pixbuf2.0-0 \       
    libgtk-3-0 \              
    libx11-6 \                 
    libxcomposite1 \           
    libxdamage1 \             
    libxrandr2 \               
    libatspi2.0-0 \             
    libnss3 \                  
    libnspr4 \                 
    libcups2 \                 
    libappindicator3-1 \       
    clang libdbus-1-dev libgtk-3-dev \
    libnotify-dev  libgconf2-dev \
    libasound2-dev libcap-dev libcups2-dev libxtst-dev \
    libxss1 libnss3-dev gcc-multilib g++-multilib curl \
    gperf bison  \  
    && rm -rf /var/lib/apt/lists/*


# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY package.json package-lock.json ./

# Instala dependências do Node.js
RUN npm install --legacy-peer-deps


# Copia todo o código para o container
COPY . .


EXPOSE 3000


CMD ["npm","run", "devAll"]
