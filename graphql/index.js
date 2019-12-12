const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql
} = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

mongoose.connect('mongodb://localhost/graphql', { useNewUrlParser: true });

const Book = require('./models/Book');
const Author = require('./models/Author');
const User = require('./models/User');

const JWT_SECRET = 'dbkhjasghkajsdhkjas';

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String]
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.genre && !args.author) {
        return Book.find({}).populate('author');
      }

      if (!args.author && args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate('author');
      }
      const author = await Author.findOne({ name: args.author });
      if (!args.genre && args.author) {
        return Book.find({ author: author._id }).populate('author');
      }
      return books
        .find({ author: author._id, genres: { $in: [args.genre] } })
        .populate('author');
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      const author = await Author.findOne({ name: args.author });
      try {
        const book = new Book({
          title: args.title,
          published: args.published,
          author: author,
          genres: args.genres
        });

        await book.save();
        pubsub.publish('BOOK_ADD', { bookAdded: book });
        return book;
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        });
      }
    },
    editAuthor: async (root, args) => {
      console.log(args);
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      await Author.findOneAndUpdate(
        { name: args.name },
        { born: parseInt(args.setBornTo) }
      );
      const updatedAuthor = await Author.findOne({ name: args.name });
      return updatedAuthor;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      });
      try {
        await user.save();
        return user;
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials');
      }
      const userForToken = {
        username: user.username,
        id: user._id
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },
  Author: {
    bookCount: async root => {
      const books = await Book.find({});
      return books.filter(book => {
        return book.author.toString() === root._id.toString();
      }).length;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
