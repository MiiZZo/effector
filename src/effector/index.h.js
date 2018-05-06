//@flow

import type {Stream} from 'most'

import {Atom} from '../derive'

export type Subscriber<A> = {
 next(value: A): void,
 // error(err: Error): void,
 //complete(): void,
}

export type Subscription = {
 (): void,
 unsubscribe(): void,
}

export type Event<E> = {
 (payload: E): E,
 eventState: Atom<{payload: E}>,
 getType(): string,
 create(payload: E, type: string): E,
 link<B>(
  b: Event<B> | Effect<B, any, any>,
  ab: (E) => B,
  ba: (B) => E,
 ): () => void,
 watch(watcher: (payload: E) => any): () => void,
 map<T>(fn: (_: E) => T): Event<T>,
 prepend<Before>(fn: (_: Before) => E): Event<Before>,
 subscribe(subscriber: Subscriber<E>): Subscription,
 to(store: Store<E>, _: void): void,
 to<T>(store: Store<T>, reducer: (state: T, payload: E) => T): void,
 epic<T>(fn: (_: Stream<E>) => Stream<T>): Event<T>,
}

export type Effect<Params, Done, Fail = Error> = {
 (
  payload: Params,
 ): {
  done(): Promise<{params: Params, result: Done}>,
  fail(): Promise<{params: Params, error: Fail}>,
  promise(): Promise<Done>,
 },
 done: Event<{params: Params, result: Done}>,
 fail: Event<{params: Params, error: Fail}>,
 use: (asyncFunction: (params: Params) => Promise<Done>) => void,
 watch(watcher: (payload: Params) => any): void,
 //map<T>(fn: (_: E) => T): Event<T>,
 link<B>(
  b: Event<B> | Effect<B, any, any>,
  ab: (Params) => B,
  ba: (B) => Params,
 ): () => void,
 prepend<Before>(fn: (_: Before) => Params): Event<Before>,
 subscribe(subscriber: Subscriber<Params>): Subscription,
 to(store: Store<Params>, _: void): void,
 to<T>(store: Store<T>, reducer: (state: T, payload: Params) => T): void,
 epic<T>(fn: (_: Stream<Params>) => Stream<T>): Event<T>,
}

export type Store<State> = {
 reset(event: Event<any> | Effect<any, any, any>): Store<State>,
 dispatch(action: any): any,
 getState(): State,
 withProps<Props, R>(
  fn: (state: State, props: Props) => R,
 ): (props: Props) => R,
 map<T>(fn: (_: State) => T): Store<T>,
 on<E>(
  event: Event<E> | Effect<E, any, any>,
  handler: (state: State, payload: E) => State,
 ): Store<State>,
 subscribe(listner: any): Subscription,
 watch<E>(watcher: (state: State, payload: E, type: string) => any): void,
}

export type Domain = {
 event<Payload>(name: string): Event<Payload>,
 effect<Params, Done, Fail>(name: string): Effect<Params, Done, Fail>,
 domain(name: string): Domain,
 store<State>(defaultState: State): Store<State>,
}
