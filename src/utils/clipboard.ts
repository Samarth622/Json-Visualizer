
export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.warn('Clipboard API failed, trying fallback method:', error);
    }
  }

  try {
    return copyUsingExecCommand(text);
  } catch (error) {
    console.error('All clipboard methods failed:', error);
    return false;
  }
}

function copyUsingExecCommand(text: string): boolean {
  const textarea = document.createElement('textarea');
  
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.width = '2em';
  textarea.style.height = '2em';
  textarea.style.padding = '0';
  textarea.style.border = 'none';
  textarea.style.outline = 'none';
  textarea.style.boxShadow = 'none';
  textarea.style.background = 'transparent';
  textarea.style.opacity = '0';
  textarea.setAttribute('readonly', '');
  
  document.body.appendChild(textarea);
  
  textarea.select();
  textarea.setSelectionRange(0, text.length);
  
  let success = false;
  try {
    success = document.execCommand('copy');
  } catch (error) {
    console.error('execCommand failed:', error);
  }
  
  document.body.removeChild(textarea);
  
  return success;
}
