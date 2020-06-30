let colorsPicker = document.getElementsByClassName('card-color');
let alert = document.getElementById('alert');
let clipboard = new Clipboard('.card-color');
let colorDefault = '#e8ecf3';
let formatColor = 'hex';
let alertFormatColor = document.getElementById('popup-format');
let hexColor = [];

execPicker();

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 32 || event.keyCode === 13) {
        execPicker();
    }
});

document.getElementById('popup-format-exit').addEventListener('click', () => {
});

function execPicker() {
    for (let i = 0; i < colorsPicker.length; i++) {
        let valorHTML = generateHTML();
        hexColor[i] = valorHTML;
        colorsPicker[i].setAttribute('data-clipboard-text', valorHTML);

        let itemsColors = colorsPicker[i].children;
        itemsColors[0].style.background = valorHTML;
        itemsColors[1].innerHTML = valorHTML;

        colorsPicker[i].addEventListener('mousemove', function (e) {
            if (e.ctrlKey) {
                document.body.style.background = valorHTML;
            }
        });

        colorsPicker[i].addEventListener('mouseleave', function (e) {
            document.body.style.background = colorDefault;

        });

        colorsPicker[i].addEventListener('click', function (e) {
            alert.style.display = 'flex';
            document.querySelector('#alert span').innerHTML = valorHTML;
            setTimeout(function () { alert.style.display = 'none'; }, 2000);
        });
    }
    if (formatColor !== 'hex') {
        changeFormat(formatColor);
    }
}

function generateHTML() {
    let html = "#";
    for (let i = 0; i < 6; i++) {
        let numero = Math.floor((Math.random() * 16) + 0);
        html += numero >= 10 ? String.fromCharCode(numero + 87) : numero;
    }

    return html.toUpperCase();
}

function popupFormat(proceso) {
    alertFormatColor.style.display = proceso ? "flex" : "none";
    if (!proceso) {
        changeFormat(formatColor = document.querySelector('input[name="format"]:checked').value);
    }
}

function changeFormat(format) {
    switch (format.toLowerCase()) {
        case 'hex':
            for (let i = 0; i < colorsPicker.length; i++) {
                colorsPicker[i].lastElementChild.innerHTML = hexColor[i];
                colorsPicker[i].setAttribute('data-clipboard-text', hexColor[i]);
            }
            break;
        case 'rgb':
            for (let i = 0; i < colorsPicker.length; i++) {
                let rgb = "rgb("
                let hexCard = hexColor[i].split('#')[1];
                hexCard = hexCard.split('');
                for (let j = 0; j < 6; j += 2) {
                    rgb += (isNaN(hexCard[j]) ? hexCard[j].charCodeAt(0) - 55 : parseInt(hexCard[j])) * 16 + (isNaN(hexCard[j + 1]) ? hexCard[j + 1].charCodeAt(0) - 55 : parseInt(hexCard[j + 1]))
                    rgb += ',';

                }
                rgb = rgb.substring(0, rgb.length - 1) + ")";
                colorsPicker[i].lastElementChild.innerHTML = rgb;
                colorsPicker[i].setAttribute('data-clipboard-text', rgb);
            }
            break;
    }
}