function displayText() {
    const input = document.getElementById('textInput').value;
    const output = document.getElementById('formattedOutput');
    output.textContent = input;
}

async function submitText() {
    const output = document.getElementById('formattedOutput').textContent;
    await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: output }),
    });
    alert("Text submitted successfully!");
}

async function fetchOutputs() {
    const response = await fetch('http://localhost:5000/outputs');
    const outputs = await response.json();
    const outputsList = document.getElementById('outputsList');
    outputsList.innerHTML = outputs.map(output => `<pre>${output.text}</pre>`).join('');
}

function copyOutput() {
    const output = document.getElementById('formattedOutput');
    navigator.clipboard.writeText(output.textContent).then(() => {
        alert("Output copied to clipboard!");
    }).catch(err => {
        alert("Failed to copy: ", err);
    });
}