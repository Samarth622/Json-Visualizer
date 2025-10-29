import { toPng } from 'html-to-image';

export async function exportAsImage(
  element: HTMLElement,
  filename: string = 'json-tree.png',
  scale: number = 1.5
): Promise<void> {
  try {
    const rect = element.getBoundingClientRect();
    const width = rect.width * scale;
    const height = rect.height * scale;

    const dataUrl = await toPng(element, {
      cacheBust: true,
      backgroundColor: '#ffffff',
      pixelRatio: 3,
      width: width,
      height: height,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: rect.width + 'px',
        height: rect.height + 'px',
      },
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
