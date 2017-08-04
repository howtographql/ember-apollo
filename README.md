## Ember & Apollo Tutorial

This is the sample project that belongs to the [Ember & Apollo Tutorial](https://www.howtographql.com/ember-apollo/0-introduction/) on How to GraphQL.

## Running the app
### 0. Verify dependencies

This project relies on two dependencies: [Node](https://nodejs.org) and [`ember-cli`](https://ember-cli.com).

Verify these dependencies are installed and configured.

### 1. Clone repository

```sh
git clone https://github.com/howtographql/ember-apollo/
cd ember-apollo
```

### 2. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

```sh
# Install Graphcool CLI
yarn global add graphcool

# Create a new project based on the Hackernews schema
graphcool init --schema https://graphqlbin.com/hn.graphql --name Hackernews 
```

This creates a GraphQL API for the following schema:

```graphql
                
type Link implements Node {
  description: String!
  postedBy: User @relation(name: "UsersLinks")
  url: String!
  votes: [Vote!] @relation(name: "VotesOnLink")
}
                          
type User implements Node {
  links: [Link!] @relation(name: "UsersLinks")
  name: String!
  votes: [Vote!] @relation(name: "UsersVotes")
}

type Vote {
  link: Link @relation(name: "VotesOnLink")
  user: User @relation(name: "UsersVotes")
}
```
                                
### 3. Connect the app with your GraphQL API
                                
Copy the simple API endpoint URL (which you find by executing `graphcool endpoints`) and replace `__SIMPLE_API_URL__` in `config/environment.js`.

### 4. Enable email-password Authentication Provider

Open your project in the [Graphcool console](https://console.graph.cool) (you can use the `graphcool console` command in the terminal or simply navigate to it in the browser).

Then click the following items:

- Select **Integrations** in the left side-menu
- Select **Email-Password Auth**
- Select **Enable**

![](http://imgur.com/UTY6IH5.png)


### 5. Install dependencies & run locally

```sh
yarn install
yarn start
```
