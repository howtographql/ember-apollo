## Ember & Apollo Tutorial

This is the sample project that belongs to the [Ember & Apollo Tutorial](https://www.howtographql.com/ember-apollo/0-introduction/) on How to GraphQL.

## Running the app
### 1. Clone repository

```sh
git clone https://github.com/howtographql/ember-apollo/
cd ember-apollo
```

### 2. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

```sh
# Install Graphcool CLI
npm install -g graphcool

# Create a new project based on the Hackernews schema
graphcool init --schema https://graphqlbin.com/hn-starter.graphql --name Hackernews 
```

This creates a GraphQL API for the following schema:

```graphql

type File implements Node {
  contentType: String!
  createdAt: DateTime!
  id: ID! @isUnique
  name: String!
  secret: String! @isUnique
  size: Int!
  updatedAt: DateTime!
  url: String! @isUnique
}
                
type Link implements Node {
  createdAt: DateTime!
  description: String!
  id: ID! @isUnique
  updatedAt: DateTime!
  url: String!
}
                          
type User implements Node {
  createdAt: DateTime!
  id: ID! @isUnique
  updatedAt: DateTime!
}
```
                                
### 3. Connect the app with your GraphQL API
                                
Copy the simple API endpoint URL (which you find by executing `graphcool endpoints`) and replace `__SIMPLE_API_URL__` in `config/environment.js`.

### 4. Install dependencies & run locally

```sh
yarn install
yarn start
```
