/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateUserError = {
  __typename?: 'CreateUserError';
  error: Scalars['String']['output'];
};

export type CreateUserOk = {
  __typename?: 'CreateUserOk';
  result: User;
};

export type CreateUserResult = CreateUserError | CreateUserOk;

export type Mutation = {
  __typename?: 'Mutation';
  createUser: CreateUserResult;
};


export type MutationCreateUserArgs = {
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
};

export type Subscription = {
  __typename?: 'Subscription';
  time: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID']['output'];
};

export type TimeSubscriptionSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TimeSubscriptionSubscription = { __typename?: 'Subscription', time: string };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const TimeSubscriptionDocument = new TypedDocumentString(`
    subscription TimeSubscription {
  time
}
    `) as unknown as TypedDocumentString<TimeSubscriptionSubscription, TimeSubscriptionSubscriptionVariables>;