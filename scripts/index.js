const userObj = JSON.parse(localStorage.getItem('userObj'));
const uname = document.querySelector('span.uname');
uname.innerHTML = userObj.name;

const end = document.querySelector('.end');
end.addEventListener('click', function () {
    localStorage.removeItem('userObj');
    location.reload()
})
