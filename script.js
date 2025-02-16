const html = document.getElementById("html")
const css = document.getElementById("css")
const javaScript = document.getElementById("javaScript")
const run_btn = document.getElementById("run-btn")
const outputFrame = document.getElementById("output")
const outputSection = document.getElementById("output-section")
const form = document.getElementById("form");
console.log(html.value)

form.addEventListener("submit",(e)=>{
    e.preventDefault()
})

run_btn.addEventListener("click", function (e) {
    runCode()
})

function runCode() {
    const code = `<html>
    <head>
    <style>${css.value}</style>
    </head>
    <body>
    ${html.value}
    </body>
    </html>
    `
    outputFrame.contentDocument.body.innerHTML = code
    outputFrame.contentWindow.eval(javaScript.value)
}
