const textarea = document.querySelector(".code-input textarea")! as HTMLTextAreaElement,
    pre = document.querySelector(".code-input pre")! as HTMLElement,
    combobox = document.getElementById("language_selection")! as HTMLSelectElement,
    fontSizes = document.getElementById("font_size")! as HTMLSelectElement,
    preview = document.getElementById("result_preview")! as HTMLElement,
    visualizer = document.querySelector(".code-input code")! as HTMLElement;
const languages = Object.keys(Prism.languages).sort() as string[];
var notyf = new Notyf();
visualizer.innerHTML = textarea.value;
const selectedLanguage = () => combobox.options[combobox.selectedIndex]?.innerText;

languages.forEach((s, i) => {
    const option = document.createElement("option");
    option.innerText = s;
    combobox.options.add(option);
    if (s == "java")
        combobox.selectedIndex = i;
});

textarea.addEventListener("input", (e) => {
    visualizer.innerHTML = textarea.value;
    Prism.highlightAll();
});

combobox.onchange = () => {
    const selected = selectedLanguage();
    visualizer.className = "language-" + selected;
    Prism.highlightAll();
};

fontSizes.onchange = () => {
    visualizer.style.fontSize = fontSizes.options[fontSizes.selectedIndex]?.value + "";
};

// @ts-ignore
combobox.onchange();

function encodeKrokiDiagram(diagramSource: string) {
    const data = new TextEncoder().encode(diagramSource);

    const compressed = pako.deflate(data, { level: 9 });

    let binaryString = '';
    const len = compressed.byteLength;
    for (let i = 0; i < len; i++) {
        binaryString += String.fromCharCode(compressed[i]!);
    }
    const base64 = btoa(binaryString);

    const urlSafeBase64 = base64
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    return urlSafeBase64;
}

function addCodeExtras(codeSource: string) {
    const lang = selectedLanguage();

    return `vars: {
        d2-config: {
        layout-engine: elk
        theme-id: 200
        pad: 0
        }
    }

    explanation: ||||${lang}
${codeSource}
    |||| {
        near: top-left
        style: {
        stroke: transparent
        }
    }`;

}

function getURL() {
    const codeSource = textarea.value;
    return "https://kroki.io/d2/svg/" + encodeKrokiDiagram(addCodeExtras(codeSource));
}

function copyBBCode() {
    const imgBB = "[img]" + getURL() + "[/img]";
    const codeBB = `[code]\n${textarea.value}\n[/code]`;
    const txt = `[spoiler=Click to view raw code]\n${codeBB}\n[/spoiler]\n\n${imgBB}`;
    navigator.clipboard.writeText(`txt`);
    notyf.success("Copied BBCode element to clipboard");
}

function getAsHTML() {
    return `<img src="${getURL()}"></img>`;
}
let previewOpen = false;
// @ts-ignore
let previewImg: HTMLImageElement = undefined;
function togglePreview() {
    if (!previewOpen && previewImg === undefined) {
        previewImg = document.createElement("img");
        preview.appendChild(previewImg);
        previewImg.src = getURL();
    }

    preview.classList.toggle("d-none");
    
    previewOpen = !previewOpen;
}


function copyHTML() {
    navigator.clipboard.writeText(getAsHTML());
    notyf.success("Copied HTML element to clipboard");
}