let colorsPicker = document.getElementsByClassName('card-color');
let alert = document.getElementById('alert');
let clipboard = new Clipboard('.card-color');
let colorDefault = '#e8ecf3';

execPicker();

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 32 || event.keyCode === 13) {
        execPicker();
    }
});

function execPicker() {
    for (let i = 0; i < colorsPicker.length; i++) {
        let valorHTML = generateHTML();
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
}

function generateHTML() {
    let html = "#";
    for (let i = 0; i < 6; i++) {
        let numero = Math.floor((Math.random() * 16) + 0);
        html += numero >= 10 ? String.fromCharCode(numero + 87) : numero;
    }

    return html.toUpperCase();
}