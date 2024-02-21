// 设置nav效果
// 获取nav
const nav = document.querySelector('nav');
// 设置点击事件委托
nav.addEventListener('click', function (e) {
    nav.querySelector('.underline').classList.remove('underline');
    e.target.classList.add('underline');

    if (e.target.innerText === '密码登录') {
        document.querySelector('.RQ').style.display = 'none';
        document.querySelector('.pass').style.display = 'block';
    }
    if (e.target.innerText === '二维码登录') {
        document.querySelector('.pass').style.display = 'none';
        document.querySelector('.RQ').style.display = 'block';
    }
})

// 用户名输入框测试
const username = document.querySelector('[name="uname"]');
username.addEventListener('change', fname);
function fname() {
    if (!username.value) {
        username.nextElementSibling.nextElementSibling.innerHTML = '!用户名不能为空';
        return false;
    }
    username.nextElementSibling.nextElementSibling.innerHTML = '';
    return true;
}

// 测试密码框不能为空
const password = document.querySelector('[name="password"]');
console.log(password)
password.addEventListener('change', fpassword)
function fpassword() {
    if (password.value) {
        password.nextElementSibling.nextElementSibling.innerHTML = '';
        return true;
    }
    password.nextElementSibling.nextElementSibling.innerHTML = '密码不能为空';
}

// 登录按钮事件
const submit = document.querySelector('section button');
const checkbox = document.querySelector('input[type="checkbox"]');
submit.addEventListener('click', function () {
    if (!checkbox.checked) {
        return alert('请同意登录登录协议');
    }
    if (fname() && fpassword()) {
        if (!JSON.parse(localStorage.getItem('lignupData'))) {
            return alert('账号或密码错误1');
        }

        const arr = JSON.parse(localStorage.getItem('lignupData'));
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === username.value) {
                if (arr[i].password === password.value) {
                    localStorage.setItem('userObj', JSON.stringify(arr[i]));
                    location.href = 'index.html';
                    return alert('登录成功');
                } else {
                    return alert('账号或密码错误2')
                }
            }
            return alert('账号或密码错误3');
        };

    };
});
