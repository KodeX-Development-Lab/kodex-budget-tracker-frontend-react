import axios from 'axios'

/**
 * Uploads a file to the server.
 * @param {File} file - The file to upload.
 * @returns {Promise<Object>} - The server response.
 */
export async function uploadFile(file: any) {
  if (!file) throw new Error('No file provided')

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_ENDPOINT}/file-upload/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  } catch (err) {
    console.error('File upload error:', err)
    throw err
  }
}
