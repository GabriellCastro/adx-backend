import { PrismaService } from './prisma.service';
import { CreateUserDto } from 'src/app/auth/dto/register-user.dto';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaService();

async function main() {
  const createUser = async (data: CreateUserDto) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.users.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return user;
  };

  await createUser({
    name: 'Admin',
    email: 'admin@gmail.com',
    password: '12345678',
    role: 'ADMIN',
  });

  await prisma.courses.createMany({
    data: [
      {
        name: 'Programador Full-stack Javascript',
        synopsis:
          'Esse curso é para quem quer se tornar um programador full-stack Javascript. Você vai aprender Javascript, Node.js, React, React Native e GraphQL.',
      },
      {
        name: 'Dominando a Linguagem Ruby',
        synopsis:
          'Esse curso é para quem quer se tornar um programador Ruby. Você vai aprender Ruby, Ruby on Rails, TDD, BDD, RSpec e muito mais.',
      },
      {
        name: 'Micro-serviços com Node.js',
        synopsis:
          'Esse curso é para quem quer se tornar um programador Node.js. Você vai aprender Node.js, Express, TDD, BDD, Mocha e muito mais.',
      },
      {
        name: 'Criando APIs Profissionais com Ruby on Rails',
        synopsis:
          'Aprenda a criar APIs profissionais com Ruby on Rails. Você vai aprender Ruby on Rails, TDD, BDD, RSpec e muito mais.',
      },
      {
        name: 'TDD na Prática: Testando APIs Node.js',
        synopsis:
          'Vamos aprender a testar APIs Node.js com TDD. Você vai aprender Node.js, Express, TDD, BDD, Mocha e muito mais.',
      },
      {
        name: 'TDD na Prática: Testando Aplicações React',
        synopsis:
          'Vamos aprender a testar aplicações React com TDD. Você vai aprender React, TDD, BDD, Jest e muito mais.',
      },
      {
        name: 'Especialista Front-end: Vue.js',
        synopsis:
          'O especialista Front-end Vue.js é para quem quer se tornar um programador Vue.js. Você vai aprender Vue.js, Vuex, Vue Router, Nuxt.js e muito mais.',
      },
      {
        name: 'Criando Sites e Apps 3D com Three.js',
        synopsis:
          'Você vai aprender Three.js, WebGL, HTML5, CSS3, Javascript e muito mais.',
      },
      {
        name: 'Dominando o Bootstrap 5',
        synopsis:
          'Domine o Bootstrap 5. Você vai aprender Bootstrap 5, HTML5, CSS3, Javascript e muito mais.',
      },
      {
        name: 'Visual Studio Code para Programadores Javascript',
        synopsis:
          'Aprenda a usar o Visual Studio Code para programar em Javascript. Você vai aprender Visual Studio Code, HTML5, CSS3, Javascript e muito mais.',
      },
      {
        name: 'Comandos do Terminal Linux: Um Guia Completo',
        synopsis:
          'Aprenda a usar os comandos do terminal Linux. Você vai aprender Linux, Shell Script, Terminal, Bash e muito mais.',
      },
      {
        name: 'Comunicação e Trabalho em Equipe',
        synopsis:
          'Aprenda a se comunicar e trabalhar em equipe. Você vai aprender a se comunicar, trabalhar em equipe, liderança e muito mais.',
      },
      {
        name: 'Programador Nômade',
        synopsis:
          'Aprenda a ser um programador nômade. Você vai aprender a trabalhar remoto, como encontrar clientes, como trabalhar com freelancers e muito mais.',
      },
      {
        name: 'O Guia do Programador Freelancer',
        synopsis:
          'Aprenda a ser um programador freelancer. Você vai aprender a trabalhar remoto, como encontrar clientes, como trabalhar com freelancers e muito mais.',
      },
    ],
  });

  console.log(`===== Users created! ======`);
  console.table({
    login: 'admin@gmail.com',
    password: '12345678',
  });
  console.log(`===== Courses created! ======`);
  console.table({
    count: 14,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
