const html = document.getElementById("html")
const css = document.getElementById("css")
const run_btn = document.getElementById("run-btn")
const outputFrame = document.getElementById("output")
const outputSection = document.getElementById("output-section");
const form = document.getElementById("form");

html.value = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
  
  </body>
</html>
`

run_btn.onclick = function (e) {
    e.preventDefault()
    const iframe = outputFrame.contentDocument || outputFrame.contentDocument.document
    const safeHTML = sanitizeHTML(html.value)
    const finalCode = injectCssIntoHtml(safeHTML, css.value)
    iframe.open()
    iframe.write(finalCode)
    iframe.close()

}


function sanitizeHTML(htmlCode) {

    const findScriptRegex = /<script[\s\S]*?<\/script>/i
    const findStyleRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/i

    if (htmlCode.match(findScriptRegex))
        htmlCode = htmlCode.replace(findScriptRegex, "")

    if (htmlCode.match(findStyleRegex))
        htmlCode = htmlCode.replace(findStyleRegex, "")


    htmlCode = htmlCode.replace(/ on\w+="[^"]*"/gi, "");
    htmlCode = htmlCode.replace(/ on\w+='[^']*'/gi, "");
    // Remove <object>...</object> and <iframe>...</iframe>
    htmlCode = htmlCode.replace(/<(object|iframe)[\s\S]*?>[\s\S]*?<\/\1>/gi, "");
    // Remove self-closing or standalone <embed> tags
    htmlCode = htmlCode.replace(/<embed\b[^>]*\/?>/gi, "");

    html.value = htmlCode

    return htmlCode
}

function injectCssIntoHtml(html, css) {
    const headContentRegex = /<head\b[^>]*>([\s\S]*?)<\/head>/i
    let headContent = html.match(headContentRegex)
    let finalHeadContent = ''
    if (headContent) {
        // console.log(headContent)
        let content = headContent[1]
        finalHeadContent = content + `<style>${css}</style>`
    }
    else {

    }
    const finalHtmlContent = html.replace(headContentRegex, finalHeadContent)
    console.log(finalHeadContent)
    return finalHtmlContent
}