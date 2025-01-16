# gRPC_LabVirtualizacao
Atividade extra-classe: Lab de gRPC com virtualização.

## 1. Alunos
- Artur Vinícius Dias Nunes: 190142421
- José Luís Ramos Teixeira: 190057858
- Pablo Christianno Silva Guedes: 200042416
- Philipe de Sousa Barros: 170154319
- Victor de Souza Cabral: 190038900

## 2. Objetivo
Construir uma aplicação distribuída com **gRPC** e explorar virtualização para suportar a aplicação. A aplicação será um microserviço de dicionário de palavras, onde as palavras são armazenadas e contadas.

## 3. Tecnologias

### 3.1. gRPC
[gRPC](https://grpc.io/) é um framework para comunicação entre servidores e clientes, utilizando HTTP/2, que oferece alto desempenho e escalabilidade.

### 3.2. Virtualização
O trabalho envolve a configuração de **máquinas virtuais** utilizando **QEMU**, **Libvirt**, **Virt-manager** e **virsh** para suportar a infraestrutura distribuída.

### 3.3. OpenSSH
**OpenSSH** será utilizado para gerenciar as máquinas virtuais remotamente e de forma segura.

## 4. Requisitos

### 4.1. Ferramentas Necessárias
Para rodar este projeto, é necessário que as seguintes ferramentas estejam instaladas:
- **Git**: Para controle de versão.
- **gRPC**: Para a comunicação entre o servidor e cliente.
- **QEMU/KVM**: Para virtualização de máquinas.
- **Libvirt**: Para gerenciamento das VMs.
- **Virt-manager**: Para interface gráfica de gerenciamento de VMs.
- **OpenSSH**: Para conexões seguras entre máquinas virtuais.

### 4.2. Capacidades da Máquina
- **20 GB de RAM** ou mais para as VMs.
- **512 GB de disco rígido** para armazenar as VMs e dados do projeto.

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
Instale as dependências:
```bash
sudo apt install build-essential autoconf libtool pkg-config protobuf-compiler libprotobuf-dev libprotoc-dev
```
### 5.3. Configuração da Virtualização
1. Instale o QEMU, libvirt e virt-manager:
```bash
sudo apt install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virt-manager
```
2. Crie e configure as VMs (VM01 e VM02) com **virt-manager** ou **virsh**.

### 5.4. Configuração de Rede
Configure duas redes:
- **LAN #1**: Rede física conectando os hosts.
- **LAN #2**: Rede virtual conectando as VMs.

### 5.5. OpenSSH
Instale e configure o OpenSSH:
```bash
sudo apt install openssh-server
```
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
- [OpenSSH](https://www.openssh.com/)
