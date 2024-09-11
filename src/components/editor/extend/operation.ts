import { Extension, Editor } from "@tiptap/core";
import { upload } from '@/common/utils'
import message from "@/components/feedback/message";
export interface OperationOptions {
    onSave?: () => void,
    onExport?: (type: String, e: Editor) => void,
    onShare?: () => void,
}
declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        operation: {
            save: () => ReturnType,
            import: () => ReturnType,
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
            import: () => () => {
                upload({ accept: 'application/json, text/*, text/markdown' }).then((res) => {
                    if (res.type === 'application/json') {
                        if (typeof res.data === 'string') {
                            const jsonData = JSON.parse(res.data);
                            this.editor.commands.setContent(jsonData, true);
                            message.success('导入成功')
                        }
                    } else if (res.type === 'text/html' || res.type === 'text/plain') {
                        this.editor.commands.setContent(res.data, true);
                        message.success('导入成功')
                    }
                    else if (res.type === 'text/markdown') {
                        message.success('导入成功')
                    } else {
                        message.error(`暂时不支持类型为[${res.type}]的文件`)
                    }
                }).catch((err) => {
                    message.error(err)
                })
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
