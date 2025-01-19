# Virtualização - Máquinas Virtuais (VMs)

Este tutorial descreve os passos para configurar a virtualização em um sistema Linux utilizando o **virsh** e o **virt-manager**. O objetivo é configurar duas máquinas virtuais (VMs) para rodar uma aplicação distribuída com gRPC e Git.

## 1. Instalar as Ferramentas de Virtualização

Primeiro, instale as ferramentas necessárias para configurar as VMs no seu sistema:

```bash
sudo apt update
sudo apt install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virt-manager
```

**Pacotes Explicados:**
- `qemu-kvm`: Kernel-based Virtual Machine (KVM) para virtualização.
- `libvirt-daemon-system`: Daemon para gerenciar as máquinas virtuais.
- `libvirt-clients`: Ferramentas de cliente para interação com o libvirt.
- `bridge-utils`: Ferramenta para criar redes virtuais.
- `virt-manager`: Interface gráfica para gerenciar as máquinas virtuais.

## 2. Adicionar o Usuário ao Grupo `libvirt` e `kvm`

Adicione o seu usuário ao grupo `libvirt` e `kvm` para garantir que você tenha permissão para gerenciar as máquinas virtuais:

```bash
sudo usermod -aG libvirt,kvm $USER
```

**Nota:** Após rodar esse comando, **saia e entre novamente** na sessão ou reinicie o sistema.

## 3. Verificar se o Sistema Suporta Virtualização

Verifique se a virtualização está habilitada em seu processador. Para isso, rode o comando:

```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
```

Se o comando retornar um valor maior que zero, significa que a virtualização está habilitada no seu processador.

## 4. Baixar as Imagens ISO

Baixe a ISO do Ubuntu Server (versão 20.04 ou superior) e coloque-a no diretório `/home/jl/isos`:

```bash
# Exemplo de download para o Ubuntu Server 20.04
wget https://releases.ubuntu.com/20.04/ubuntu-20.04.6-live-server-amd64.iso -P /home/jl/isos
```

## 5. Criar as Máquinas Virtuais (VMs)

Agora vamos criar as VMs, tanto usando a interface gráfica do **virt-manager** quanto a linha de comando com **virsh**.

### 5.1 Usando o Virt-Manager (Interface Gráfica)

1. Abra o `virt-manager`:

   ```bash
   virt-manager
   ```

2. No **virt-manager**, clique em **File > New Virtual Machine**.

3. Selecione **Local install media (ISO image or CDROM)**, e depois escolha a ISO que você baixou (`/home/jl/isos/ubuntu-20.04.6-live-server-amd64.iso`).

4. Configure a VM:
   - **Nome**: VM01 ou VM02.
   - **Memória**: 2 GB para VM01 e 1 GB para VM02.
   - **CPU**: 2 vCPUs para VM01 e 1 vCPU para VM02.
   - **Espaço de disco**: 18 GB para VM01 e 16 GB para VM02.

5. **Finalize a configuração** e **instale o sistema operacional** nas VMs.

### 5.2 Usando o Virsh (Linha de Comando)

Se preferir usar a linha de comando, siga os passos abaixo.

#### Criar e Instalar VM01:

```bash
# Criar a VM01 com 2 GB de RAM, 2 vCPUs, e 18 GB de disco
sudo virt-install   --name VM01   --vcpus 2   --memory 2048   --disk path=/var/lib/libvirt/images/VM01.img,size=18   --cdrom /home/jl/isos/ubuntu-20.04.6-live-server-amd64.iso   --os-type linux   --os-variant ubuntu20.04   --network network=default   --graphics none   --console pty,target_type=serial   --noautoconsole
```

#### Criar e Instalar VM02:

```bash
# Criar a VM02 com 1 GB de RAM, 1 vCPU, e 16 GB de disco
sudo virt-install   --name VM02   --vcpus 1   --memory 1024   --disk path=/var/lib/libvirt/images/VM02.img,size=16   --cdrom /home/jl/isos/ubuntu-20.04.6-live-server-amd64.iso   --os-type linux   --os-variant ubuntu20.04   --network network=default   --graphics none   --console pty,target_type=serial   --noautoconsole
```

## 6. Configuração de Rede Virtual (LAN #2)

A solução será usar **rede virtual** configurada com **virsh**.

1. Crie um **bridge virtual** para a rede LAN #2. Isso permitirá que as VMs se comuniquem entre si e com o host físico.

```bash
# Criar bridge de rede virtual
sudo virsh net-define /etc/libvirt/qemu/networks/default.xml
sudo virsh net-start default
sudo virsh net-autostart default
```

2. Conecte as VMs à rede virtual LAN #2 usando o **virt-manager**:
   - No **virt-manager**, edite as configurações de rede das VMs e selecione **Network: default** (para LAN #2).

## 7. Verificação das Máquinas Virtuais

Depois de configurar tudo, você pode verificar se as VMs estão rodando corretamente com os comandos:

```bash
# Verificar se as VMs estão em execução
sudo virsh list --all
```

Se as VMs estiverem listadas e rodando corretamente, você pode acessar as VMs via console usando o virt-manager ou via SSH, caso tenha configurado uma rede para acessar as VMs de outro host ou máquina.

## 8. Postar as VMs no Moodle

Para garantir que as VMs tenham um tamanho reduzido, remova qualquer dado extra que não seja necessário para o funcionamento do projeto e compacte as VMs.

1. **Compactar as VMs**:
   - Primeiro, desligue as VMs:
   
     ```bash
     sudo virsh shutdown VM01
     sudo virsh shutdown VM02
     ```

   - Compacte os discos das VMs:
   
     ```bash
     sudo qemu-img convert -O qcow2 /var/lib/libvirt/images/VM01.img /var/lib/libvirt/images/VM01_compressed.qcow2
     sudo qemu-img convert -O qcow2 /var/lib/libvirt/images/VM02.img /var/lib/libvirt/images/VM02_compressed.qcow2
     ```

2. **Transferir para o Moodle**: 
   - Assegure-se de que o tamanho final das VMs esteja dentro dos limites para o envio.

## 9. Conclusão

Com essas etapas, você configurará a infraestrutura de virtualização com as ferramentas **virsh** e **virt-manager**, usando duas VMs com as especificações de recursos adequadas para rodar a aplicação distribuída com gRPC, Git e o sistema de rede.