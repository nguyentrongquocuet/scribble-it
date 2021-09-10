import { Ref } from 'vue';

export type RefItAllStrict<T> = T extends Record<string, any> ? {
  [k in keyof T]: Ref<T[k]>
} : Ref<T>;

export type RefItAll<T> = T extends Record<string, any> ? {
  [k in keyof T]: Ref<T[k] | undefined>
} : Ref<T|undefined>;
