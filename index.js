
const div1 = document.getElementById('text1');
const div6 = document.getElementById('text2');

const contentDiv1 = div1.innerHTML;
const contentDiv6 = div6.innerHTML;

div1.innerHTML = contentDiv6;
div6.innerHTML = contentDiv1;

document.addEventListener('DOMContentLoaded', function() {
    const side1 = 10;
    const side2 = 15;

    function calculateRhombusArea(side1, side2) {
        return side1 * side2 / 2;
    }

    const area = calculateRhombusArea(side1, side2);
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Площа ромба: ${area}`;
});

document.addEventListener('DOMContentLoaded', function() {
    const triangleForm = document.getElementById('triangle-form');
    const resultElement = document.getElementById('triangleResult');

    triangleForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const side1 = parseFloat(document.getElementById('side1').value);
        const side2 = parseFloat(document.getElementById('side2').value);
        const side3 = parseFloat(document.getElementById('side3').value);

        if (isValidTriangle(side1, side2, side3)) {
            resultElement.textContent = 'Можливо побудувати трикутник.';
            setCookie('triangleResult', 'Можливо побудувати трикутник.');
        } else {
            resultElement.textContent = 'Неможливо побудувати трикутник.';
            setCookie('triangleResult', 'Неможливо побудувати трикутник.');
        }
    });

    function isValidTriangle(a, b, c) {
        return a + b > c && a + c > b && b + c > a;
    }

    function setCookie(name, value) {
        document.cookie = `${name}=${value}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }

    if (document.cookie.includes('triangleResult')) {
        const result = getCookie('triangleResult');
        const removeCookies = confirm(`Результат: ${result}\nБажаєте видалити cookies?`);

        if (removeCookies) {
            deleteCookie('triangleResult');
            location.reload();
        } else {
            alert('Cookies збережено. Перезавантажте сторінку.');
        }
    }

    function getCookie(name) {
        const cookieArray = document.cookie.split(';');
        for (let cookie of cookieArray) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName.trim() === name) {
                return cookieValue;
            }
        }
        return '';
    }

    function deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const text2 = document.querySelector('.part-2');
    const italicCheckbox = document.getElementById('italicCheckbox');

    if (localStorage.getItem('italicText') === 'true') {
        text2.style.fontStyle = 'italic';
        italicCheckbox.checked = true;
    }

    italicCheckbox.addEventListener('change', function() {
        if (italicCheckbox.checked) {
            text2.style.fontStyle = 'italic';
            localStorage.setItem('italicText', 'true');
        } else {
            text2.style.fontStyle = 'normal';
            localStorage.setItem('italicText', 'false');
        }
    });

    text2.addEventListener('mouseover', function() {
        if (italicCheckbox.checked) {
            text2.style.fontStyle = 'italic';
        }
    });

    text2.addEventListener('mouseout', function() {
        if (localStorage.getItem('italicText') === 'true') {
            text2.style.fontStyle = 'italic';
        } else {
            text2.style.fontStyle = 'normal';
        }
    });
});

const partBlocks = document.querySelectorAll('.part');

window.addEventListener('load', () => {
    partBlocks.forEach((block, index) => {
        const storedList = localStorage.getItem(`list${index + 1}`);
        if (storedList) {
            const storedOl = document.createElement('ol');
            storedOl.innerHTML = storedList;
            block.appendChild(storedOl);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Видалити список з localStorage';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => {
                localStorage.removeItem(`list${index + 1}`);
                block.removeChild(storedOl);
                block.removeChild(deleteButton);
                alert('Список видалено з localStorage!');
            });
            block.appendChild(deleteButton);
        }
    });
});

partBlocks.forEach((block, index) => {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = `Показати список ${index + 1}`;

    const ol = document.createElement('ol');
    let count = 10;

    let saveButton;

    link.addEventListener('click', (event) => {
        event.preventDefault();
        const existingOl = block.querySelector('ol');
        if (!existingOl) {
            for (let i = 1; i <= count; i++) {
                const li = document.createElement('li');
                li.textContent = `Елемент ${i}`;
                if (i % 2 === 0) {
                    li.classList.add('even-item');
                }
                ol.appendChild(li);
            }
            block.appendChild(ol);

            if (!saveButton) {
                saveButton = document.createElement('button');
                saveButton.textContent = 'Зберегти список у localStorage';
                saveButton.addEventListener('click', () => {
                    localStorage.setItem(`list${index + 1}`, ol.innerHTML);
                    alert('Список збережено в localStorage!');
                });
                block.appendChild(saveButton);
            }
        } else {
            block.removeChild(existingOl);
            const deleteButton = block.querySelector('.delete-button');
            if (deleteButton) {
                block.removeChild(deleteButton);
            }
        }
    });

    block.appendChild(link);
});