import { toPng } from 'html-to-image';

export async function exportAsImage(
  element: HTMLElement,
  filename: string = 'json-tree.png'
): Promise<void> {
  try {
    const dataUrl = await toPng(element, {
      cacheBust: true,
      backgroundColor: '#ffffff',
      pixelRatio: 2,
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Error exporting image:', error);
    throw new Error('Failed to export image');
  }
}
