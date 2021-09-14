export interface SuccessUploadResponseData {
  success: true;
  url: string;
}

export interface ErrorUploadResponseData {
  success: false;
  message: string;
}

export type UploadResponseData = SuccessUploadResponseData | ErrorUploadResponseData;

export const BASE_UPLOAD_URL = import.meta.env.VITE_UPLOAD_SERVER_URL;

/**
 * Upload a file or formdata to server, uploadData, operation and field MUST be provided
 */
export async function uploadFile(uploadData: File | FormData, operation = '', field = '', baseUrl = BASE_UPLOAD_URL): Promise<{ fileUrl: string; } | string> {
  const url = `${baseUrl}?o=${operation}&f=${field}`;
  let dataToUpload = uploadData;
  if (uploadData instanceof File) {
    dataToUpload = new FormData();
    dataToUpload.append(field, uploadData);
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: dataToUpload,
    });
    const data = await response.json() as UploadResponseData;
    const { success } = data;
    if (!success) throw new Error(data.message);
    const { url: fileUrl } = data;
    return {
      fileUrl,
    };
  } catch (e) {
    return e.message;
  }
}

export const d = '';
