declare const textarea: HTMLTextAreaElement, pre: HTMLElement, combobox: HTMLSelectElement, fontSizes: HTMLSelectElement, preview: HTMLElement, visualizer: HTMLElement;
declare const languages: string[];
declare var notyf: import("../types/notyf").Notyf;
declare const selectedLanguage: () => string | undefined;
declare function encodeKrokiDiagram(diagramSource: string): string;
declare function addCodeExtras(codeSource: string): string;
declare function getURL(): string;
declare function copyBBCode(): void;
declare function getAsHTML(): string;
declare let previewOpen: boolean;
declare let previewImg: HTMLImageElement;
declare function togglePreview(): void;
declare function copyHTML(): void;
//# sourceMappingURL=index.d.ts.map