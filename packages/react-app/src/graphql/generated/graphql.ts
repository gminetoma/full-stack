/* eslint-disable */
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

export type CreateFooError = {
  __typename?: 'CreateFooError';
  error: Scalars['String']['output'];
};

export type CreateFooOk = {
  __typename?: 'CreateFooOk';
  result: Foo;
};

export type CreateFooResult = CreateFooError | CreateFooOk;

export type Foo = {
  __typename?: 'Foo';
  id: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFoo: CreateFooResult;
};


export type MutationCreateFooArgs = {
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  foos: Array<Foo>;
};
