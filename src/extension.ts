import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('Endwise Only extension is now active!');

  // Enter キーで end を自動挿入
  const insertEnd = vscode.commands.registerCommand('endwise-only.insertEnd', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const position = editor.selection.active;
    const lineText = editor.document.lineAt(position.line).text.trim();

    // メソッド定義や if 文、クラスの終了を判断
    if (shouldInsertEnd(lineText)) {
      editor.edit(editBuilder => {
        editBuilder.insert(new vscode.Position(position.line + 1, 0), 'end\n');
      });
    }
  });

  context.subscriptions.push(insertEnd);
}

// 自動挿入を判定するロジック
function shouldInsertEnd(lineText: string): boolean {
  const patterns = [
    /def\s+\w+/,  // メソッド定義
    /if\s+/,      // if 文
    /class\s+/,   // クラス定義
    /module\s+/   // モジュール定義
  ];

  return patterns.some(pattern => pattern.test(lineText));
}

export function deactivate() {}
