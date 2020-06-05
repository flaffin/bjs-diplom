

const myUserForm = new UserForm();

myUserForm.loginFormCallback = data => ApiConnector.login({ login: data.login, password: data.password}, response => {
    if (response.success === true){
        location.reload();
    } else {
        myUserForm.setLoginErrorMessage(response.data);
    }
    });

myUserForm.registerFormCallback = data => ApiConnector.register({ login: data.login, password: data.password}, response => {
        if (response.success === true){
            myUserForm.setRegisterErrorMessage("Вы успешно зарегистрировались");
            location.reload();
        } else {
            myUserForm.setRegisterErrorMessage("Не удалось зарегистрировать пользователя");
        }
        });

