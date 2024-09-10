import {Extension, Editor} from "@tiptap/core";


export interface OperationOptions {
    onSave?: () => void,
    onImport?: (type: String) => void,
    onExport?: (type: String, e: Editor) => void,
    onShare?: () => void,
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        operation: {
            save: () => ReturnType,
            import: (type: String) => ReturnType,
            export: (type: String) => ReturnType,
            share: () => ReturnType,
        }
    }
}

export const Operation = Extension.create<OperationOptions>({
    name: "operation",
    addCommands() {
        return {
            save: () => () => {
                if (this.options.onSave) {
                    this.options.onSave();
                }
                return false;
            },
            import: (type) => () => {
                if (this.options.onImport) {
                    this.options.onImport(type)
                }
                return false;
            },
            export: (type) => () => {
                if (this.options.onExport) {
                    this.options.onExport(type, this.editor)
                }
                return false;
            },
            share: () => () => {
                if (this.options.onShare) {
                    this.options.onShare()
                }
                return false;
            },
        }
    }
})
