import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changeField, initializeForm, register} from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import {check} from "../../modules/user";
import {withRouter} from 'react-router-dom';

const RegisterForm = ({history}) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const {form, auth, authError, user} = useSelector(({auth, user}) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
        user: user.user
    }));

    const onChange = e => {
        const {value, name} = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value,
            }),
        );
    };

    const onSubmit = e => {
        e.preventDefault();
        const {username, password, passwordConfirm} = form;

        if ([username, password, passwordConfirm].includes('')) {
            setError('필수 값을 모두 입력해 주세요.');
            return;
        }

        if (password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            changeField({form: 'register', key: "password", value: ''});
            changeField({form: 'register', key: "passwordConfirm", value: ''});
            return;
        }
        dispatch(register({username, password}));
    };

    useEffect(() => {
        dispatch(initializeForm('register'));
    }, [dispatch]);

    //컴포넌트가 처음 렌더링시 form 초기화
    useEffect(() => {
        if (authError) {
            //아이디 중복
            if (authError.response.status === 409) {
                setError('이미 존재하는 계정입니다.');
                return;
            }
            setError('잠시후 다시 시도해주세요.');
            return;
        }
        if (auth) {
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    //user 값 설정 확인
    useEffect(() => {
        if (user) {
            //홈화면
            history.push('/');
            try {
                localStorage.setItem('user', JSON.stringify(user));
            } catch (e) {
                console.log('localStorage is not working');
            }
        }
    }, [history, user]);

    return (
        <AuthForm type={'register'} form={form} onChange={onChange} onSubmit={onSubmit} error={error}/>
    );
};

export default withRouter(RegisterForm);