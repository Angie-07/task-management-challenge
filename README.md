# My Task App

## Project Description

This application, created with *create-react-app*, is a tool for managing tasks. It allows users to easily add, modify, and delete tasks efficiently.

## Project Structure

```
└── 📁src
    └── App.css
    └── App.test.tsx
    └── App.tsx
    └── 📁components
        └── 📁ControlsContainer
            └── ControlsContainer.tsx
            └── index.tsx
            └── 📁TaskForm
                └── index.tsx
                └── TaskForm.tsx
        └── 📁SearchTask
            └── index.tsx
            └── SearchTask.tsx
        └── 📁Sidebar
            └── index.tsx
            └── Sidebar.tsx
    └── index.css
    └── index.tsx
    └── 📁pages
        └── 📁Dashboard
            └── Dashboard.tsx
            └── index.tsx
            └── 📁TaskCardContainer
                └── index.tsx
                └── 📁ListTasks
                    └── index.tsx
                    └── ListTasks.tsx
                └── 📁TaskComponent
                    └── index.tsx
                    └── TaskComponent.tsx
                └── TasksCardContainer.tsx
        └── 📁ErrorPage
            └── ErrorPage.tsx
            └── index.tsx
        └── 📁MyTask
            └── index.tsx
            └── MyTask.tsx
            └── 📁TaskTableContainer
                └── index.tsx
                └── 📁TaskTable
                    └── index.tsx
                    └── TaskTable.tsx
                └── TaskTableContainer.tsx
        └── 📁NotFound
            └── index.tsx
            └── NotFound.tsx
    └── react-app-env.d.ts
    └── reportWebVitals.ts
    └── setupTests.ts
    └── 📁shared
        └── 📁api
            └── api.ts
            └── apolloClient.ts
        └── 📁assets
            └── avatar.jpg
            └── logo.jpeg
        └── 📁schema
            └── schema.ts
        └── 📁services
            └── mutations.ts
            └── queries.ts
    └── 📁styles
        └── coolTheme.ts
        └── Theme.tsx
    └── 📁types
        └── styled.d.ts
```

## Technological Justification

- *React*: We chose React for its efficiency and flexibility in building interactive and dynamic user interfaces.
    
- *TypeScript*: Integrating TypeScript allows for more robust development by providing static typing, improving code readability, and reducing errors.
    
- *Styled Components*: We use Styled Components for styling, as it provides an elegant way to write CSS-in-JS, facilitating customization and code maintenance.
    
- *Ant Design*: Ant Design is incorporated to leverage its pre-built components and provide a consistent and appealing user interface.
    

## Technologies Used

- React ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white)
- TypeScript ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
- Styled Components ![Styled Components](https://img.shields.io/badge/-Styled_Components-DB7093?logo=styled-components&logoColor=white)
- Ant Design ![Ant Design](https://img.shields.io/badge/-Ant_Design-0170FE?logo=ant-design&logoColor=white)

## Dependencies

- *@apollo/client*: State management and server communication through GraphQL.
- *react-router-dom*: Routing to navigate between different pages of the application.
- *@types/react-router-dom*: Typings for react-router-dom.
- *graphql*: Syntax and execution of GraphQL queries.
- *@types/graphql*: Typings for GraphQL.