export type FormDataEntryValue = string | File;
export type FormDataMap = Record<string, FormDataEntryValue>;

export interface LoginFormDataMap extends FormDataMap {
  username: string;
  password: string;
}
