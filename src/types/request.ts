export interface RequestAttributes {
  [key: string]: any
  t(path: string, variables?: Object): string
}

export interface Session {
  get(key?: string): { [key: string]: any } | any
  set(key: string, value: any): { [key: string]: any }
}
