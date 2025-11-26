/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types';
    import    { users as Query_users } from './../user/resolvers/Query/users';
import    { createUser as Mutation_createUser } from './../user/resolvers/Mutation/createUser';
import    { time as Subscription_time } from './../time/resolvers/Subscription/time';
import    { CreateUserError } from './../user/resolvers/CreateUserError';
import    { CreateUserOk } from './../user/resolvers/CreateUserOk';
import    { User } from './../user/resolvers/User';
    export const resolvers: Resolvers = {
      Query: { users: Query_users },
      Mutation: { createUser: Mutation_createUser },
      Subscription: { time: Subscription_time },
      CreateUserError: CreateUserError,
CreateUserOk: CreateUserOk,
User: User
    }