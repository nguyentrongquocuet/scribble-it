export function getFormData(form: HTMLFormElement):void {
  return new FormData(form);
}

export async function isFileTypeValid(file: File, extension: string[] = []): Promise<boolean> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onloadend = (ev) => {
      const result = reader.result as unknown as ArrayBuffer;
      const arr = new Uint8Array(result);
      const header = arr.slice(0, 4).reduce<string>((el1, el2) => el1.concat(el2.toString(16)), '');
      console.log(header);
      res(!!header);
    };
  });
}

export async function readDataUrl(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      res(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}

export function getFileFromEvent(e: Event): File | undefined {
  const target = e.target as HTMLInputElement;
  if (!target) return;
  const { files } = target;
  if (!files) return;
  const file = files[0];
  if (!file) return;
  return file;
}
