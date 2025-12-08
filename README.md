## 🌟 Hotel Aurora Frontend 🌟

Este repositório contém o código-fonte do frontend do **Hotel Aurora**, uma aplicação desenvolvida em **Angular** com foco em proporcionar uma experiência de usuário intuitiva e elegante, utilizando os componentes do **Angular Material**.

-----

### 📖 Visão Geral do Projeto

O Hotel Aurora é uma plataforma de gerenciamento e reservas de hotéis, projetada para refletir a **serenidade e o acolhimento** que são a essência da marca. A experiência do usuário é segmentada em três áreas principais:

1.  **Área Pública (Acolhimento e Contemplação):**
      * Destinada a qualquer visitante, apresenta o conceito do Hotel Aurora: "Aqui, a pressa não tem espaço — apenas a serenidade."
      * Permite ao usuário conhecer o hotel, suas dependências, espaços alugáveis e a filosofia de serviço.
2.  **Área do Cliente (Seu Lugar de Descanso):**
      * Disponível após **login** (cadastro ou autenticação via Google).
      * Permite que o hóspede **faça reservas** de quartos e outros espaços, gerencie suas informações e visualize o histórico.
3.  **Área Administrativa (Gestão Completa):**
      * Acesso restrito para funcionários do hotel.
      * Oferece funcionalidades **CRUD (Create, Read, Update, Delete)** completas para gerenciar:
          * **Hotéis**
          * **Funcionários**
          * **Clientes (Pessoa Física e Jurídica)**
          * **Espaços Alugáveis (Quartos, Sauna, Spa, Salão de Conferência)**

-----

### 🔑 Funcionalidades Chave

  * **Autenticação Flexível:** Login via **cadastro** tradicional ou **autenticação rápida via Google**.

  * **Gestão de Entidades:** CRUD completo na área administrativa.

  * **Sistema de Reservas:** Permite a reserva de quartos e espaços por clientes logados.

  * **Cálculo de Pagamento Dinâmico:** O cálculo do valor da reserva é baseado na seguinte fórmula:

    $$
    \text{Valor Final} = (\text{Preço Base} \times \text{Fator Multiplicador}) \times \text{Duração}
    $$

    Onde:

      * **Preço Base:** Valor padrão de **R$ 1000,00**.
      * **Fator Multiplicador:** Definido no `enum` do espaço alugável (ex: Quarto Tipo Presidencial tem fator 5.0).
      * **Duração:** **Número de dias** (para quartos) ou **número de horas** (para outros espaços).

-----

### 💻 Tecnologias Utilizadas

| Tecnologia | Descrição |
| :--- | :--- |
| **Angular** | Framework principal para construção da Single Page Application (SPA). |
| **Angular Material** | Biblioteca de componentes UI que implementa o Material Design. |
| **TypeScript** | Linguagem de desenvolvimento para maior segurança e escalabilidade. |
| **RxJS** | Utilizado para gerenciamento de estados e manipulação de eventos assíncronos. |

-----

### 🚀 Primeiros Passos

Siga as instruções abaixo para configurar e rodar o projeto localmente.

#### Pré-requisitos

Certifique-se de ter o **Node.js** e o **Angular CLI** instalados em sua máquina.

```bash
# Instalação global do Angular CLI, se ainda não estiver instalado
npm install -g @angular/cli
```

#### Instalação

1.  Clone este repositório:

    ```bash
    git clone https://github.com/vitoriaraso/pi4-hotel-aurora
    ```


1.1  **Link para o Backend:**

➡️ **[Acessar o Repositório do Backend (Spring Boot)](https://github.com/ErickGX/api_hotel_pi_4sem)**


2.  Instale as dependências do projeto:

    ```bash
    npm install
    ```

#### Executando a Aplicação

1.  Inicie o servidor de desenvolvimento do Angular:

    ```bash
    ng serve
    ```

2.  Acesse a aplicação no seu navegador. Por padrão, ela estará disponível em:

      * `http://localhost:4200/`

-----

### 💡 Dicas de Desenvolvimento

  * **Estrutura de Componentes:** O projeto segue uma estrutura modular, facilitando a navegação.
  * **Boas Práticas:** Utilize o **Angular CLI** para gerar novos componentes, serviços e módulos (`ng generate component <nome>`), mantendo a consistência do código.
  * **Estilização:** Toda a estilização primária é gerenciada pelo Angular Material. Para customizações específicas, utilize arquivos CSS locais aos componentes.
  * **Backend:** Este é apenas o frontend. Certifique-se de que o **servidor backend** (onde as APIs de CRUD e autenticação residem) esteja em execução e configurado corretamente (ajustar URLs de API nos serviços, se necessário).

-----

### 🤝 Contribuição

Contribuições são bem-vindas\! Se você deseja aprimorar a experiência do **Hotel Aurora**, sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.

-----

> ✨ "Do nascer ao pôr do sol, tudo convida à contemplação." ✨
