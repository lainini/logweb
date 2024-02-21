// 获取后台注册数据
const arr = JSON.parse(localStorage.getItem('lignupData')) || [];



// 输入框change事件正则检测

// uname输入框检查
// 获取uname输入框元素
const uname = document.querySelector('[name="uname"]');
// 为输入框元素提那就change事件 并执行fname函数
uname.addEventListener('change', fname);
// 创建uname检查函数
function fname() {
    if (/^[a-zA-Z][a-zA-Z0-9_]{4,18}$/.test(uname.value)) {
        if (!arr[0]) { uname.nextElementSibling.innerHTML = ''; return true; };
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name === uname.value) {
                uname.nextElementSibling.innerHTML = '名称已被占用';
                return false;
            }
        }
        uname.nextElementSibling.innerHTML = '';
        return true;
    };
    uname.nextElementSibling.innerHTML = '格式错误';
};

// phone输入框检查
const phone = document.querySelector('[name="phone"]');
phone.addEventListener('change', fphone);
function fphone() {
    if (/^1(3[0-9]{9}|6[0-9]{9}|8[0-9]{9})$/.test(phone.value)) {
        phone.nextElementSibling.innerHTML = '';
        return true;
    }
    phone.nextElementSibling.innerHTML = '格式错误';
}

// code输入框检查
const code = document.querySelector('[name="code"]');
code.addEventListener('change', fcode);
function fcode() {
    if (/(?=.*[0-9])(?=.*[a-z])[0-9a-z]{4}/.test(code.value)) {
        code.nextElementSibling.innerHTML = '';
        return true;
    };
    code.nextElementSibling.innerHTML = '格式错误';
}
// 获取验证码记时
const getcode = code.nextElementSibling.nextElementSibling;
let intervalname;
getcode.addEventListener('click', function () {
    if (!intervalname) {
        let i = 5;
        getcode.innerHTML = '5秒后重新发送';
        intervalname = setInterval(() => {
            i--;
            getcode.innerHTML = `${i}秒后重新发送`;
            if (i <= 0) {
                getcode.innerHTML = '重新发送';
                clearInterval(intervalname)
                intervalname = null;
            };
        }, 1000);
    };
})

// password输入框检查
const password = document.querySelector('[name="password"]');
password.addEventListener('change', fpassword);
function fpassword() {
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])[a-zA-Z\d._]{8,18}$/.test(password.value)) {
        password.nextElementSibling.innerHTML = '';
        return true;
    };
    password.nextElementSibling.innerHTML = '格式错误';
};
const conpass = document.querySelector('[name="confirm_password"]');
conpass.addEventListener('change', fconpass);
function fconpass() {
    if ((password.value === conpass.value)) {
        conpass.nextElementSibling.innerHTML = '';
        return true;
    }
    conpass.nextElementSibling.innerHTML = '密码不一致';
};

// 用户协议控件
const checkbox = document.querySelector('[type="checkbox"]')

// 提交按钮检查
const form = document.querySelector('form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!checkbox.checked) { alert('请先同意用户协议'); return; };
    if (fname() && fphone() && fcode() && fpassword() && fconpass()) {
        userData = {
            name: uname.value,
            phone: phone.value,
            password: password.value,
            checkbox: checkbox.checked
        };
        arr.push(userData);
        localStorage.setItem('lignupData', JSON.stringify(arr));
        alert("注册成功")
        location.href = "login.html"
        form.reset()
    } else {
        alert('请检查信息');
    };
})