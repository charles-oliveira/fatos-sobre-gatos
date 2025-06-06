# Projeto: Curiosidades Felinas com Next.js + NextUI

## Descrição

Uma aplicação completa de e-commerce dedicada a curiosidades sobre gatos, desenvolvida com Next.js 15 e NextUI. O projeto combina uma loja virtual de "fatos sobre gatos" com um jogo interativo de quiz, oferecendo uma experiência educativa e divertida sobre o mundo felino.

### Funcionalidades Principais

🛍️ **E-commerce de Curiosidades:**
- Catálogo de produtos (fatos sobre gatos)
- Páginas dinâmicas de produtos
- Sistema de categorização (Básico/Premium)
- Interface de compra simulada

🎮 **Jogo Interativo:**
- Quiz de verdadeiro ou falso
- Sistema de pontuação e níveis
- Conquistas e rankings
- Power-ups especiais

🎨 **Design Moderno:**
- Interface responsiva
- Animações suaves com Framer Motion
- Tema escuro/claro
- Glassmorphism e gradientes

## Tecnologias

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **NextUI (HeroUI)**
- **Framer Motion** (Animações)
- **React Icons**

## Estrutura do Projeto

```
projeto-fatos-gatos/
├── app/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── CatFactsGame.tsx
│   │   ├── GameStats.tsx
│   │   ├── Leaderboard.tsx
│   │   └── AnimatedContent.tsx
│   ├── produtos/           # Rotas do e-commerce
│   │   ├── page.tsx        # Listagem de produtos
│   │   └── [id]/          # Página dinâmica do produto
│   │       └── page.tsx
│   ├── fatos/[id]/        # Página dinâmica de fatos
│   │   └── page.tsx
│   ├── login/             # Página de login
│   │   └── page.tsx
│   ├── layout.tsx         # Layout global
│   ├── loading.tsx        # Loading component
│   ├── page.tsx          # Página inicial (jogo)
│   └── globals.css       # Estilos globais
├── public/               # Assets estáticos
└── README.md
```

## Rotas Principais

### ✅ Requisitos Atendidos

1. **Página inicial** (`/`): Jogo interativo de quiz sobre gatos
2. **Listagem de produtos** (`/produtos`): Catálogo de curiosidades felinas
3. **Página dinâmica** (`/produtos/[id]`): Detalhes do produto individual
4. **Página de login** (`/login`): Simulação de autenticação
5. **Páginas extras** (`/fatos/[id]`): Detalhes de fatos específicos

## Consumo de API

- **API Externa:** [Cat Facts API](https://catfact.ninja/) para dados reais
- **Fallback:** Dados mockados para garantir funcionamento offline
- **Implementação:** Server-side e client-side conforme necessário
- **Cache:** Revalidação a cada hora para otimizar performance

## Como rodar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/SEU_USUARIO/fatos-sobre-gatos.git

# Navegar para o diretório
cd fatos-sobre-gatos/projeto-fatos-gatos

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar em produção
npm start
```

### Comandos disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run start    # Servidor de produção
npm run lint     # Verificar código
```

## Features Implementadas

### 🎨 Design e UX
- [x] Interface moderna com Tailwind CSS
- [x] Componentes NextUI estilizados
- [x] Animações fluidas com Framer Motion
- [x] Design responsivo (mobile-first)
- [x] Tema escuro/claro
- [x] Micro-interações e hover effects

### 🛍️ E-commerce
- [x] Catálogo de produtos com filtros
- [x] Páginas dinâmicas de produtos
- [x] Sistema de categorias
- [x] Interface de compra
- [x] Produtos relacionados
- [x] Breadcrumbs e navegação

### 🎮 Gamificação
- [x] Quiz interativo
- [x] Sistema de pontuação
- [x] Níveis e XP
- [x] Conquistas desbloqueáveis
- [x] Ranking global
- [x] Power-ups especiais

### ⚡ Performance
- [x] Server-side rendering
- [x] Cache inteligente
- [x] Lazy loading
- [x] Otimização de imagens
- [x] Bundle otimizado

### 🔧 Arquitetura
- [x] App Router (Next.js 15)
- [x] TypeScript com tipagem forte
- [x] Componentes reutilizáveis
- [x] Hooks customizados
- [x] Error boundaries
- [x] Loading states

## Estrutura de Dados

### Produto (Curiosidade)
```typescript
interface CatFact {
  id: number;
  fact: string;
  length: number;
  category: string;
  price: string;
}
```

### Usuário (Simulado)
```typescript
interface User {
  name: string;
  email: string;
  score: number;
  level: number;
}
```

## Deploy

### Vercel (Recomendado)
1. Conectar repositório GitHub à Vercel
2. Configurar build command: `npm run build`
3. Configurar output directory: `.next`
4. Deploy automático a cada push

### Outras opções
- Netlify
- Railway
- Cloudflare Pages

## Melhorias Futuras

- [ ] Sistema de autenticação real
- [ ] Banco de dados
- [ ] Carrinho de compras persistente
- [ ] Sistema de pagamento
- [ ] API própria para fatos
- [ ] Modo multiplayer real
- [ ] PWA (Progressive Web App)

## Contribuição

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit: `git commit -m 'Adiciona nova feature'`
4. Push: `git push origin feature/nova-feature`
5. Abra um Pull Request

## Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Links

- [Deploy na Vercel](https://seu-projeto.vercel.app)
- [Repositório GitHub](https://github.com/SEU_USUARIO/fatos-sobre-gatos)

---

## Tecnologias Utilizadas

### Frontend
- **Next.js 15**: Framework React com App Router
- **TypeScript**: Tipagem estática
- **Tailwind CSS v4**: Framework CSS utilitário  
- **NextUI**: Biblioteca de componentes UI
- **Framer Motion**: Animações fluidas

### Desenvolvimento
- **ESLint**: Linting de código
- **PostCSS**: Processamento CSS
- **Vercel**: Deploy e hosting

### APIs
- **Cat Facts API**: Dados externos de fatos sobre gatos
- **Fetch API**: Consumo de dados

---

**Desenvolvido por [Seu Nome] para a disciplina de Next.js + NextUI**

📅 Entregue em: 06/06/2024
🎯 Requisitos: 100% atendidos
