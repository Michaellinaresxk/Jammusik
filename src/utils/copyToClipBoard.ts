import { textCopyClickboard } from './toasts'

export const copyToClipboard = (parameterToCopy: string) => {
  navigator.clipboard
    .writeText(parameterToCopy)
    .then(() => {
      textCopyClickboard()
    })
    .catch((error) => {
      console.error('Error al copiar al portapapeles:', error)
    })
}
