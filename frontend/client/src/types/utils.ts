export type FormDataEntryValue = string | File;
export type FormDataMap = Record<string, FormDataEntryValue|undefined>;

export interface LoginFormDataMap extends FormDataMap {
  username: string;
  password: string;
}

export interface SignUpFormDataMap extends FormDataMap {
  username: string;
  password: string;
  repassword: string;
  avatar?: File;
}
