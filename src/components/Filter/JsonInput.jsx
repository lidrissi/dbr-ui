import React, { memo } from "react";
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/display/placeholder'
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import jsonlint from 'jsonlint-mod';

window.jsonlint = jsonlint;

const JsonInput = memo(({
    onChange,
    height,
    value
}) => {

    return (
        <div
            style={{
                border: '1px solid hsl(0, 0%, 80%)',
                borderRadius: '2px',
                overflow: 'scroll',
                height: height ? `${height}px` : 'auto'
            }}>
            <CodeMirror
                value={value}
                onChange={onChange}
                options={{
                    mode: 'application/json',
                    gutters: ["CodeMirror-lint-markers"],
                    styleActiveLine: true,
                    lineNumbers: true,
                    line: true,
                    lint: true,
                    autoCloseBrackets: true,
                    maxLength: 20,
                    lineWrapping: true
                }} />
        </div>
    )
})

export default JsonInput