# PSPD - gRPC_LabVirtualizacao
- FGA0244 
- PROGRAMAÇÃO PARA SISTEMAS PARALELOS E DISTRIBUÍDOS 
- T01 (2024.2 - 24T23) 
- Atividade extra-classe: Lab de gRPC com virtualização.

## 1. Alunos
- Artur Vinícius Dias Nunes: 190142421
- José Luís Ramos Teixeira: 190057858
- Pablo Christianno Silva Guedes: 200042416
- Philipe de Sousa Barros: 170154319
- Victor de Souza Cabral: 190038900

</br>
</br>

## 2. Objetivo
Construir uma aplicação distribuída com **gRPC** e explorar virtualização para suportar a aplicação. Server em **gRPC c++**, backend/client em **gRPC python**, frontend em **React**, **typescript** e **Vite**.

A aplicação será um microserviço de dicionário de palavras, onde as palavras são armazenadas e contadas. 

Adicione a palavra em ```Adicionar Palavra``` e depois lista as palavras e ocorrências escevenco ```imprimir``` e depois clicando em ```Adicionar Palavra``` novamente. Isso no frontend da aplicação.

## 3. Tecnologias

### 3.1. gRPC
[gRPC](https://grpc.io/) é um framework para comunicação entre servidores e clientes, utilizando HTTP/2, que oferece alto desempenho e escalabilidade.

### 3.2. Virtualização
O trabalho envolve a configuração de **máquinas virtuais** utilizando **QEMU**, **Libvirt**, **Virt-manager** e **virsh** para suportar a infraestrutura distribuída.

</br>
</br>
</br>

## 4. Requisitos

### 4.1. Ferramentas Necessárias
Para rodar este projeto, é necessário que as seguintes ferramentas estejam instaladas:
- **Git**: Para controle de versão.
- **gRPC**: Para a comunicação entre o servidor e cliente.
- **QEMU/KVM**: Para virtualização de máquinas.
- **Libvirt**: Para gerenciamento das VMs.
- **Virt-manager**: Para interface gráfica de gerenciamento de VMs.

### 4.2. Capacidades das VMs
- **vm01:** 16GB de disco, 2GB de RAM e 2 CPUs.
- **vm02:** 30GB de disco, 2GB de RAM e 2 CPUs.

</br>
</br>
</br>

## 5. Passo a Passo para Implementação

### 5.1. Instalação do Git e Configuração do Repositório
```bash
sudo apt update
sudo apt install git
```
Clone o repositório:
```bash
git clone git@github.com:joseluis-rt/gRPC_LabVirtualizacao.git
```
### 5.2. Preparando o Ambiente para o gRPC
Clone o repositório gRPC e Faça a intalação localmente conforme no site oficial e linguagem: 
    - Servidor [C++](https://grpc.io/docs/languages/cpp/quickstart/)
    - Cliente  [Python](https://grpc.io/docs/languages/python/quickstart/)

Lembre-se de executar o servidor antes do cliente.

#### 5.2.1. Detalhes de intalação em C++ para o servidor
Tenha certeza de exportar uma váriavel com o caminho para pasta local de instalação do gRPC
```bash
export MY_INSTALL_DIR=~/gRPC/.local
```

```bash
export PATH="$MY_INSTALL_DIR/bin:$PATH"
```

```bash
mkdir -p $MY_INSTALL_DIR
```

Instale o cmake
```bash
sudo apt install -y cmake
```

Instale as dependências:
```bash
sudo apt install build-essential autoconf libtool pkg-config protobuf-compiler libprotobuf-dev libprotoc-dev
```

Com o repositório gRPC clonado faça a instalação do gRPC e Procol Buffers:
```bash
cd grpc
mkdir -p cmake/build
pushd cmake/build
cmake -DgRPC_INSTALL=ON \
      -DgRPC_BUILD_TESTS=OFF \
      -DCMAKE_CXX_STANDARD=17 \
      -DCMAKE_INSTALL_PREFIX=$MY_INSTALL_DIR \
      ../..
make -j 4
make install
popd
```

#### 5.2.2. Executando o cliente
Dentro do diretório gRPC/grpc-client crie uma ambiente virtual python e o ative:
```bash
python3 -m venv venv
source venv/bin/activate
```

Instale as dependências:
```bash
python -m pip install --upgrade pip
python -m pip install grpcio grpcio-tools
```

No diretório gRPC/grpc-client e com o ambiente virtual ativo:
```bash
python insert_client.py
```

#### 5.2.3. Executando Servidor C++
No diretório gRPC/grpc-server prepare o ambiente de build com os seguintes comandos:

Primeiro remova se já tiver criado, para atualizar o Cache:
```bash
rm -r cmake
```

```bash
mkdir -p cmake/build
cd cmake/build
cmake -DCMAKE_PREFIX_PATH=$MY_INSTALL_DIR ../..
```
obs: Veja que será usada a variável $MY_INSTALL_DIR novamente, tenha certeza de exporta ela como mostrado anteriormente no mesmo terminal antes de executar os comandos.

Ainda no diretório da build, compile usando make
```bash
make
```

Inicie o servidor com o seguinte comando:
```bash
./insert_server
```


### 5.3. Configuração da Virtualização
1. Instale o QEMU, libvirt e virt-manager:
```bash
sudo apt install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virt-manager
```
2. Crie e configure as VMs (VM01 e VM02) com **virt-manager** ou **virsh**.

### 5.4. Configuração de Rede
Configure duas redes:
- **LAN #1**: Rede conectando os hosts.
- **LAN #2**: Rede virtual conectando as VMs.

## 5.6. Executando o Frontend

### 5.6.1. Instalação das Dependências

1. Navegue até o diretório do frontend:
    ```bash
    cd frontend
    ```

2. Instale as dependências do projeto:
    ```bash
    npm install
    ```

### 5.6.2. Executando o Frontend

1. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

2. Abra o navegador e acesse:
    ```
    http://localhost:5173/
    ```

### 5.6.2. Executando o Backend

1. Na pasta backend, crie uma venv e ative-a:
```bash
python3 -m venv venv
source venv/bin/activate
```

2. Atualize o pip:
```bash
python -m pip install --upgrade pip
```

3. Instale o gRPC e o gRPC tools:
```bash
python -m pip install grpcio grpcio-tools
```

4. Instale o flask:
```bash
pip install flask flask-cors 
```

</br>
</br>
</br>

## 6. Estrutura do Projeto
- **server.c**: Código do servidor gRPC que mantém o dicionário de palavras.
- **client.c**: Código do cliente gRPC.
- **README.md**: Este arquivo com instruções do projeto.

## 7. Entrega
A entrega consiste em:
1. **Relatório**: Descrição do gRPC, virtualização e a infraestrutura configurada.
2. **Arquivos das VMs** configuradas.
3. **Vídeo** de apresentação.
4. **Documentação dos códigos** e configurações.

## 8. Links Úteis
- [gRPC](https://grpc.io/)
- [QEMU](https://www.qemu.org/)
- [Libvirt](https://libvirt.org/)
- [Virt-Manager](https://virt-manager.org/)